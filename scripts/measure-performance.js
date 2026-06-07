#!/usr/bin/env node

/**
 * Web Performance Measurement Tool
 *
 * Measures the performance of your current branch using Lighthouse audits.
 * This is useful for quick performance checks without the overhead of comparing
 * against main. Results are automatically tracked for historical comparison.
 *
 * Usage:
 *   node scripts/measure-performance.js
 *
 * What it measures:
 *   - Performance score and other Lighthouse scores (0-100)
 *   - Core Web Vitals: FCP, LCP, CLS, TTI, TBT
 *   - Speed Index (how quickly content becomes visually complete)
 *   - Resource sizes and counts (images, fonts, scripts, etc.)
 *
 * Process:
 *   1. Builds the current branch
 *   2. Runs a Lighthouse audit on localhost
 *   3. Displays results with human-readable formatting
 *   4. Compares with previous measurement (if available)
 *   5. Saves results to .benchmarks/ for historical tracking
 *
 * Historical tracking:
 *   - Latest results: .benchmarks/latest-results.json
 *   - History (last 20): .benchmarks/results-history.json
 *   - Full Lighthouse report: .benchmarks/lighthouse-latest.json
 */

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const RESULTS_FILE = path.join(__dirname, "../.benchmarks/latest-results.json");

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  section: (msg) => console.log(`\n${"=".repeat(70)}\n${msg}\n${"=".repeat(70)}`),
};

async function waitForServer(port, maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/`, (res) => {
          resolve();
        });
        req.on("error", reject);
        req.setTimeout(1000);
      });
      return true;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return false;
}

function runLighthouse(port, outputPath) {
  log.info("Running Lighthouse audit (this may take 30-60 seconds)...");
  try {
    execSync(
      `npx lighthouse http://localhost:${port}/ --output=json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: "pipe", cwd: path.join(__dirname, "../web") }
    );
    log.success("Lighthouse audit complete");
    return true;
  } catch (e) {
    log.warn(`Lighthouse audit skipped: ${e.message.split("\n")[0]}`);
    return false;
  }
}

function parseResults(jsonPath) {
  if (!fs.existsSync(jsonPath)) {
    return null;
  }

  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const audits = raw.audits;

  return {
    timestamp: new Date().toISOString(),
    performance: Math.round(raw.categories.performance.score * 100),
    accessibility: Math.round(raw.categories.accessibility.score * 100),
    bestPractices: Math.round(raw.categories["best-practices"].score * 100),
    seo: Math.round(raw.categories.seo.score * 100),
    fcp: audits["first-contentful-paint"]?.numericValue || 0,
    lcp: audits["largest-contentful-paint"]?.numericValue || 0,
    cls: audits["cumulative-layout-shift"]?.numericValue || 0,
    tbt: audits["total-blocking-time"]?.numericValue || 0,
    tti: audits["interactive"]?.numericValue || 0,
    speedIndex: audits["speed-index"]?.numericValue || 0,
    totalImageSize: calculateImageBytes(raw),
  };
}

function calculateImageBytes(lighthouse) {
  const resourceSummary = lighthouse.audits["resource-summary"];
  if (!resourceSummary || !resourceSummary.details) return 0;

  const imageItem = resourceSummary.details.items.find(
    (item) => item.resourceType === "image"
  );
  return imageItem ? Math.round(imageItem.transferSize / 1024) : 0; // KB
}

function formatMetric(value, key) {
  if (key === "cls") return value.toFixed(3);
  if (key.endsWith("Size")) return `${value} KB`;
  if (key.includes("Index") || key === "fcp" || key === "lcp" || key === "tbt" || key === "tti") {
    return `${value.toFixed(0)} ms`;
  }
  if (key.endsWith("Score") || key === "performance") return value;
  return value;
}

function displayResults(results) {
  if (!results) {
    log.error("No results to display");
    return;
  }

  log.section("Lighthouse Audit Results");

  console.log("\n📊 Performance Scores:");
  console.log(`   Performance:     ${results.performance}/100`);
  console.log(`   Accessibility:   ${results.accessibility}/100`);
  console.log(`   Best Practices:  ${results.bestPractices}/100`);
  console.log(`   SEO:             ${results.seo}/100`);

  console.log("\n⚡ Core Web Vitals:");
  console.log(`   FCP (First Contentful Paint):    ${results.fcp.toFixed(0)} ms`);
  console.log(`   LCP (Largest Contentful Paint):  ${results.lcp.toFixed(0)} ms`);
  console.log(`   CLS (Cumulative Layout Shift):   ${results.cls.toFixed(3)}`);

  console.log("\n🔧 Other Metrics:");
  console.log(`   Time to Interactive (TTI):       ${results.tti.toFixed(0)} ms`);
  console.log(`   Total Blocking Time (TBT):       ${results.tbt.toFixed(0)} ms`);
  console.log(`   Speed Index:                     ${results.speedIndex.toFixed(0)} ms`);

  console.log("\n🖼️  Image Metrics:");
  console.log(`   Total Image Size:                ${results.totalImageSize} KB`);
}

function compareWithPrevious(current) {
  const historyFile = path.join(path.dirname(RESULTS_FILE), "results-history.json");
  if (!fs.existsSync(historyFile)) {
    return null;
  }

  try {
    const history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
    if (history.length === 0) return null;

    const previous = history[history.length - 1];

    log.section("Comparison with Previous Measurement");

    const metrics = [
      { name: "Performance Score", key: "performance", isPercentage: true },
      { name: "FCP", key: "fcp", suffix: "ms", isBetter: "lower" },
      { name: "LCP", key: "lcp", suffix: "ms", isBetter: "lower" },
      { name: "CLS", key: "cls", suffix: "", isBetter: "lower" },
      { name: "Image Size", key: "totalImageSize", suffix: "KB", isBetter: "lower" },
    ];

    console.log("\n" + "─".repeat(80));
    console.log(
      `${"Metric".padEnd(25)} ${"Previous".padEnd(18)} ${"Current".padEnd(18)} ${"Change".padEnd(19)}`
    );
    console.log("─".repeat(80));

    const improvements = [];
    const regressions = [];

    metrics.forEach(({ name, key, suffix, isBetter }) => {
      const prevVal = previous[key];
      const currVal = current[key];
      const diff = currVal - prevVal;
      const pctChange = prevVal !== 0 ? ((diff / prevVal) * 100).toFixed(1) : 0;

      const isImprovement = isBetter === "lower" ? diff < 0 : diff > 0;
      const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
      const sign = diff > 0 ? "+" : "";

      const prevStr = typeof prevVal === "number" ? prevVal.toFixed(0) : prevVal;
      const currStr = typeof currVal === "number" ? currVal.toFixed(0) : currVal;
      const changeStr = `${arrow} ${sign}${diff.toFixed(0)} ${suffix} (${pctChange}%)`;

      console.log(
        `${name.padEnd(25)} ${(prevStr + " " + suffix).padEnd(18)} ${(currStr + " " + suffix).padEnd(18)} ${changeStr.padEnd(19)}`
      );

      if (diff !== 0) {
        if (isImprovement) {
          improvements.push({ name, change: Math.abs(pctChange) });
        } else {
          regressions.push({ name, change: Math.abs(pctChange) });
        }
      }
    });

    console.log("─".repeat(80));

    if (improvements.length > 0) {
      console.log(`\n✨ Improvements (${improvements.length}):`);
      improvements.forEach(({ name, change }) => {
        console.log(`   • ${name}: ${change}% better`);
      });
    }

    if (regressions.length > 0) {
      console.log(`\n⚠️  Regressions (${regressions.length}):`);
      regressions.forEach(({ name, change }) => {
        console.log(`   • ${name}: ${change}% worse`);
      });
    }

    return { improvements, regressions };
  } catch (e) {
    return null;
  }
}

function saveResults(results) {
  const dir = path.dirname(RESULTS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save latest
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

  // Append to history
  const historyFile = path.join(dir, "results-history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
  }
  history.push(results);
  // Keep last 20 measurements
  if (history.length > 20) {
    history = history.slice(-20);
  }
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  log.success(`Results saved to ${RESULTS_FILE}`);
}

async function main() {
  log.section("Performance Measurement Tool");

  const webDir = path.join(__dirname, "../web");
  process.chdir(webDir);

  log.info("Building site...");
  try {
    execSync("npm run build", { stdio: "pipe" });
    log.success("Build complete");
  } catch (e) {
    log.error("Build failed");
    process.exit(1);
  }

  log.info("Starting development server on port 9000...");
  const serverProcess = spawn("npm", ["run", "serve"], {
    detached: true,
    stdio: "pipe",
  });

  const ready = await waitForServer(9000);
  if (!ready) {
    log.error("Server failed to start");
    process.kill(-serverProcess.pid);
    process.exit(1);
  }

  log.success("Server ready");

  const dir = path.dirname(RESULTS_FILE);
  const lighthouseJson = path.join(dir, "lighthouse-latest.json");
  const success = runLighthouse(9000, lighthouseJson);

  // Kill server
  try {
    process.kill(-serverProcess.pid);
  } catch (e) {
    // Server may already be dead
  }

  if (success) {
    const results = parseResults(lighthouseJson);
    if (results) {
      displayResults(results);
      compareWithPrevious(results);
      saveResults(results);
    }
  }

  process.exit(0);
}

main().catch((err) => {
  log.error(err.message);
  process.exit(1);
});

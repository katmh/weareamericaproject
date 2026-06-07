#!/usr/bin/env node

/**
 * Performance benchmark script
 * Compares image optimization metrics between main and current branch
 * Usage: node scripts/benchmark.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const BENCHMARKS_DIR = path.join(__dirname, "../.benchmarks");
const MAIN_RESULTS = path.join(BENCHMARKS_DIR, "main-results.json");
const BRANCH_RESULTS = path.join(BENCHMARKS_DIR, "branch-results.json");

// Ensure benchmarks directory exists
if (!fs.existsSync(BENCHMARKS_DIR)) {
  fs.mkdirSync(BENCHMARKS_DIR, { recursive: true });
}

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  section: (msg) => console.log(`\n${"=".repeat(60)}\n${msg}\n${"=".repeat(60)}`),
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
  log.info("Running Lighthouse audit...");
  try {
    execSync(
      `npx lighthouse http://localhost:${port}/ --output=json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: "pipe" }
    );
    log.success("Lighthouse audit complete");
    return true;
  } catch (e) {
    log.error(`Lighthouse failed: ${e.message}`);
    return false;
  }
}

function parseResults(jsonPath) {
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const audits = raw.audits;

  return {
    performance: Math.round(raw.categories.performance.score * 100),
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

function compareResults(main, branch) {
  const metrics = [
    { name: "Performance Score", key: "performance", unit: "pts", format: (v) => v },
    { name: "First Contentful Paint", key: "fcp", unit: "ms", format: (v) => v.toFixed(0) },
    { name: "Largest Contentful Paint", key: "lcp", unit: "ms", format: (v) => v.toFixed(0) },
    { name: "Cumulative Layout Shift", key: "cls", unit: "", format: (v) => v.toFixed(3) },
    { name: "Total Blocking Time", key: "tbt", unit: "ms", format: (v) => v.toFixed(0) },
    { name: "Time to Interactive", key: "tti", unit: "ms", format: (v) => v.toFixed(0) },
    { name: "Speed Index", key: "speedIndex", unit: "ms", format: (v) => v.toFixed(0) },
    { name: "Total Image Size", key: "totalImageSize", unit: "KB", format: (v) => v },
  ];

  console.log("\n" + "─".repeat(85));
  console.log(
    `${"Metric".padEnd(30)} ${"Main".padEnd(20)} ${"Branch".padEnd(20)} ${"Change".padEnd(15)}`
  );
  console.log("─".repeat(85));

  const improvements = [];
  const regressions = [];

  metrics.forEach(({ name, key, unit, format }) => {
    const mainVal = main[key];
    const branchVal = branch[key];
    const diff = branchVal - mainVal;
    const pctChange = mainVal !== 0 ? ((diff / mainVal) * 100).toFixed(1) : 0;

    const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
    const sign = diff > 0 ? "+" : "";
    const change = `${arrow} ${sign}${format(diff)} ${unit} (${pctChange}%)`;

    const mainFormatted = format(mainVal);
    const branchFormatted = format(branchVal);

    console.log(
      `${name.padEnd(30)} ${(mainFormatted + " " + unit).padEnd(20)} ${(branchFormatted + " " + unit).padEnd(20)} ${change.padEnd(15)}`
    );

    // Track improvements/regressions (lower is better for most metrics, except performance score)
    const isImprovement =
      (key === "performance" && diff > 0) ||
      (key !== "performance" && diff < 0);

    if (diff !== 0) {
      if (isImprovement) {
        improvements.push({
          metric: name,
          improvement: Math.abs(pctChange),
        });
      } else {
        regressions.push({
          metric: name,
          regression: Math.abs(pctChange),
        });
      }
    }
  });

  console.log("─".repeat(85));

  return { improvements, regressions };
}

function getCurrentBranch() {
  return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
}

function checkoutBranch(branch) {
  log.info(`Checking out ${branch}...`);
  execSync(`git checkout ${branch}`, { stdio: "pipe" });
  log.success(`Checked out ${branch}`);
}

async function benchmarkBranch(branchName, outputFile) {
  log.section(`Benchmarking: ${branchName}`);

  checkoutBranch(branchName);

  log.info("Building site...");
  execSync("npm run build", { stdio: "pipe" });
  log.success("Build complete");

  log.info("Starting dev server on port 9000...");
  const serverProcess = require("child_process").spawn("npm", ["run", "serve"], {
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

  const lighthouseJson = outputFile.replace(".json", "-lighthouse.json");
  const success = runLighthouse(9000, lighthouseJson);

  // Kill server
  process.kill(-serverProcess.pid);

  if (!success) {
    process.exit(1);
  }

  const results = parseResults(lighthouseJson);
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  log.success(`Results saved to ${outputFile}`);

  return results;
}

async function main() {
  log.section("Performance Benchmark Tool");

  const currentBranch = getCurrentBranch();
  log.info(`Current branch: ${currentBranch}`);

  if (currentBranch === "main") {
    log.error("Cannot run benchmark from main branch");
    process.exit(1);
  }

  // Benchmark main
  const mainResults = await benchmarkBranch("main", MAIN_RESULTS);

  // Benchmark current branch
  const branchResults = await benchmarkBranch(currentBranch, BRANCH_RESULTS);

  // Return to original branch
  checkoutBranch(currentBranch);

  // Compare results
  log.section("Performance Comparison: main vs " + currentBranch);
  const { improvements, regressions } = compareResults(mainResults, branchResults);

  // Summary
  log.section("Summary");

  if (improvements.length > 0) {
    console.log(`\n✨ Improvements (${improvements.length}):`);
    improvements.forEach(({ metric, improvement }) => {
      console.log(`   • ${metric}: ${improvement}% better`);
    });
  }

  if (regressions.length > 0) {
    console.log(`\n⚠️  Regressions (${regressions.length}):`);
    regressions.forEach(({ metric, regression }) => {
      console.log(`   • ${metric}: ${regression}% worse`);
    });
  }

  if (improvements.length === 0 && regressions.length === 0) {
    console.log("\n→ No significant changes detected");
  }

  // Expected improvements for image optimization
  if (mainResults.totalImageSize > 0) {
    const imageSavings = mainResults.totalImageSize - branchResults.totalImageSize;
    const imageSavingsPercent = ((imageSavings / mainResults.totalImageSize) * 100).toFixed(1);
    console.log(
      `\n🖼️  Image Size Reduction: ${imageSavings} KB (${imageSavingsPercent}%)`
    );
    console.log(`   Main: ${mainResults.totalImageSize} KB → Branch: ${branchResults.totalImageSize} KB`);
  }

  process.exit(0);
}

main().catch((err) => {
  log.error(err.message);
  process.exit(1);
});

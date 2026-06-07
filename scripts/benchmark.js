#!/usr/bin/env node

/**
 * Web Performance Benchmark Tool
 *
 * Automatically measures and compares performance metrics between the main branch
 * and your current branch. This helps quantify the impact of performance optimizations
 * including (but not limited to) image optimization, code splitting, bundling changes,
 * rendering performance, etc.
 *
 * Usage:
 *   node scripts/benchmark.js
 *
 * What it measures:
 *   - Performance score (Lighthouse, 0-100)
 *   - Core Web Vitals: FCP, LCP, CLS, TTI
 *   - Additional metrics: Speed Index, Total Blocking Time
 *   - Resource sizes: Total images, fonts, scripts
 *
 * Process:
 *   1. Checks out main branch, builds, and runs Lighthouse audit
 *   2. Checks out your current branch, builds, and runs Lighthouse audit
 *   3. Compares metrics and highlights improvements/regressions
 *   4. Returns to your original branch
 *
 * Results are saved to .benchmarks/ (excluded from git via .gitignore)
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

/**
 * Metric definitions:
 *
 * Performance Score (0-100): Overall performance rating. Influenced by:
 *   - Core Web Vitals weights (LCP 25%, CLS 5%, FID 30%, others 40%)
 *   - Page load speed
 *   - Interactivity metrics
 *
 * First Contentful Paint (FCP, ms): Time until first content appears
 *   - Target: < 1.8s
 *   - Affects: User perception of speed
 *
 * Largest Contentful Paint (LCP, ms): Time until largest element loads
 *   - Target: < 2.5s
 *   - Often affected by: images, CSS, JavaScript
 *
 * Cumulative Layout Shift (CLS, score): Visual stability (0.0-1.0)
 *   - Target: < 0.1
 *   - Affected by: unsized images, dynamic content, ads
 *   - User impact: Annoying UX, accidental clicks
 *
 * Time to Interactive (TTI, ms): When page is fully interactive
 *   - Target: < 3.8s
 *   - Affected by: JavaScript execution, main thread blocking
 *
 * Total Blocking Time (TBT, ms): Sum of blocking time on main thread
 *   - Target: < 200ms
 *   - Indicates: Responsiveness to user input
 *
 * Speed Index (ms): Visual completeness over time
 *   - Lower is better
 *   - Reflects: Perceived loading performance
 *
 * Total Image Size (KB): Sum of all image bytes transferred
 *   - Often the largest resource on modern pages
 *   - Major impact on: LCP, page load time, bandwidth usage
 */
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

/**
 * Interpret results:
 *
 * Improvements (↓ for most metrics):
 *   - > 5% improvement: Significant win, worth celebrating
 *   - 3-5% improvement: Measurable improvement, may reflect real user benefit
 *   - < 3% improvement: Within noise margin, could be variance
 *
 * Regressions (↑ for most metrics):
 *   - > 5% regression: Worth investigating, may impact users
 *   - 3-5% regression: Monitor, could be variance or real issue
 *   - < 3% regression: Likely noise, no action needed
 *
 * Notes:
 *   - Performance Score has wider variance due to weighting algorithm
 *   - Local benchmarks vs production: Real user conditions may vary
 *   - Browser cache affects results: Both branches tested with fresh cache
 *   - System load matters: Close background apps for consistent results
 *
 * Next steps:
 *   1. Review significant changes (>5%)
 *   2. Consider if change is expected (e.g., larger JS bundle)
 *   3. Test on production with real user monitoring
 *   4. Check with WebPageTest or GTmetrix for external validation
 */
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

/**
 * Usage guide:
 *
 * Before optimizing:
 *   git checkout -b my-optimization
 *   npm run perf:benchmark
 *   # Note baseline metrics
 *
 * Make changes and optimize:
 *   # Edit source, rebuild, etc.
 *
 * After optimizing:
 *   npm run perf:benchmark
 *   # Compare results with baseline
 *
 * Typical use cases:
 *   - Measuring impact of image optimization (compression, formats, lazy loading)
 *   - Code splitting and bundling changes
 *   - Component rendering performance
 *   - CSS/font loading optimization
 *   - Resource prioritization changes
 *   - Any change affecting page load or interactivity
 *
 * Tips:
 *   - Close other apps for consistent results
 *   - Run multiple times if concerned about variance
 *   - Check Lighthouse's detailed report in .benchmarks/ for specific issues
 *   - Production metrics (via Web Vitals monitoring) are ultimate truth
 */
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

#!/usr/bin/env node

/**
 * Web Performance Comparison Benchmark
 *
 * Compares performance metrics between two live deployments.
 * Useful for comparing production vs deploy preview to see the real-world
 * impact of changes.
 *
 * Usage:
 *   node scripts/benchmark-comparison.js <url1> <url2> [--name1 "label"] [--name2 "label"]
 *
 * Examples:
 *   node scripts/benchmark-comparison.js \
 *     https://weareamericaproject.com \
 *     https://deploy-preview-109--weareamericaproject.netlify.app \
 *     --name1 "Production" --name2 "Preview"
 *
 * What it measures:
 *   - Performance score (Lighthouse, 0-100)
 *   - Core Web Vitals: FCP, LCP, CLS, TTI, TBT
 *   - Speed Index and other metrics
 *   - Resource sizes
 *
 * Why compare deployments?
 *   - Real CDN and caching behavior
 *   - Production-realistic network conditions
 *   - No local system variance
 *   - Shows actual user-facing performance impact
 *
 * Workflow:
 *   1. Audits first URL
 *   2. Audits second URL
 *   3. Compares metrics side-by-side
 *   4. Highlights improvements/regressions
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const BENCHMARKS_DIR = path.join(__dirname, "../.benchmarks");

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  section: (msg) => console.log(`\n${"=".repeat(70)}\n${msg}\n${"=".repeat(70)}`),
};

if (!fs.existsSync(BENCHMARKS_DIR)) {
  fs.mkdirSync(BENCHMARKS_DIR, { recursive: true });
}

function runLighthouse(url, outputPath) {
  log.info(`Auditing ${url}...`);
  try {
    execSync(
      `npx lighthouse "${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: "pipe" }
    );
    return true;
  } catch (e) {
    log.error(`Failed: ${e.message}`);
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
  return imageItem ? Math.round(imageItem.transferSize / 1024) : 0;
}

function compareResults(results1, results2) {
  const metrics = [
    { name: "Performance Score", key: "performance", unit: "/100", isBetter: "higher" },
    { name: "FCP", key: "fcp", unit: "ms", isBetter: "lower" },
    { name: "LCP", key: "lcp", unit: "ms", isBetter: "lower" },
    { name: "CLS", key: "cls", unit: "", isBetter: "lower" },
    { name: "TTI", key: "tti", unit: "ms", isBetter: "lower" },
    { name: "TBT", key: "tbt", unit: "ms", isBetter: "lower" },
    { name: "Speed Index", key: "speedIndex", unit: "ms", isBetter: "lower" },
    { name: "Image Size", key: "totalImageSize", unit: "KB", isBetter: "lower" },
  ];

  console.log("\n" + "─".repeat(90));
  console.log(
    `${"Metric".padEnd(25)} ${"URL 1".padEnd(20)} ${"URL 2".padEnd(20)} ${"Change".padEnd(25)}`
  );
  console.log("─".repeat(90));

  const improvements = [];
  const regressions = [];

  metrics.forEach(({ name, key, unit, isBetter }) => {
    const val1 = results1[key];
    const val2 = results2[key];
    const diff = val2 - val1;
    const pctChange = val1 !== 0 ? ((diff / val1) * 100).toFixed(1) : 0;

    const isImprovement =
      (isBetter === "higher" && diff > 0) ||
      (isBetter === "lower" && diff < 0);

    const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
    const emoji = Math.abs(pctChange) < 3 ? "" : isImprovement ? " ✨" : " ⚠️";

    const val1Str = typeof val1 === "number" ? val1.toFixed(val1 < 10 ? 2 : 0) : val1;
    const val2Str = typeof val2 === "number" ? val2.toFixed(val2 < 10 ? 2 : 0) : val2;
    const changeStr = `${arrow} ${pctChange}%${emoji}`;

    console.log(
      `${name.padEnd(25)} ${(val1Str + unit).padEnd(20)} ${(val2Str + unit).padEnd(20)} ${changeStr.padEnd(25)}`
    );

    if (Math.abs(pctChange) >= 3) {
      if (isImprovement) {
        improvements.push({ name, pct: Math.abs(pctChange) });
      } else {
        regressions.push({ name, pct: Math.abs(pctChange) });
      }
    }
  });

  console.log("─".repeat(90));

  return { improvements, regressions };
}

async function main() {
  const url1 = process.argv[2];
  const url2 = process.argv[3];

  const name1Index = process.argv.indexOf("--name1");
  const name2Index = process.argv.indexOf("--name2");
  const name1 = name1Index !== -1 ? process.argv[name1Index + 1] : null;
  const name2 = name2Index !== -1 ? process.argv[name2Index + 1] : null;

  if (!url1 || !url2) {
    log.error("Usage: node scripts/benchmark-comparison.js <url1> <url2> [--name1 'label'] [--name2 'label']");
    log.error("\nExample:");
    log.error("  node scripts/benchmark-comparison.js \\");
    log.error("    https://weareamericaproject.com \\");
    log.error("    https://deploy-preview-109--weareamericaproject.netlify.app \\");
    log.error("    --name1 'Production' --name2 'Preview'");
    process.exit(1);
  }

  log.section("Web Performance Comparison");
  log.info(`URL 1: ${name1 || url1}`);
  log.info(`URL 2: ${name2 || url2}`);

  // Validate URLs
  try {
    new URL(url1);
    new URL(url2);
  } catch (e) {
    log.error("Invalid URL");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  const lh1Path = path.join(BENCHMARKS_DIR, `lighthouse-url1-${timestamp}.json`);
  const lh2Path = path.join(BENCHMARKS_DIR, `lighthouse-url2-${timestamp}.json`);

  // Benchmark both URLs
  log.section("Running audits...");
  const success1 = runLighthouse(url1, lh1Path);
  log.success("URL 1 complete");

  const success2 = runLighthouse(url2, lh2Path);
  log.success("URL 2 complete");

  if (!success1 || !success2) {
    process.exit(1);
  }

  const results1 = parseResults(lh1Path);
  const results2 = parseResults(lh2Path);

  // Display comparison
  log.section(`Performance Comparison`);
  const { improvements, regressions } = compareResults(results1, results2);

  // Summary
  log.section("Summary");
  if (improvements.length > 0) {
    console.log(`\n✨ Improvements (${improvements.length}):`);
    improvements.forEach(({ name, pct }) => {
      console.log(`   • ${name}: ${pct}% better`);
    });
  }

  if (regressions.length > 0) {
    console.log(`\n⚠️ Regressions (${regressions.length}):`);
    regressions.forEach(({ name, pct }) => {
      console.log(`   • ${name}: ${pct}% worse`);
    });
  }

  if (improvements.length === 0 && regressions.length === 0) {
    console.log("\n→ No significant changes detected (within 3% margin)");
  }

  process.exit(0);
}

main().catch((err) => {
  log.error(err.message);
  process.exit(1);
});

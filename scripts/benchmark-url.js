#!/usr/bin/env node

/**
 * Web Performance Benchmark for External URLs
 *
 * Measures performance of a live deployment (e.g., Netlify deploy preview)
 * and compares against production. This gives real-world performance metrics
 * since the site is deployed on actual servers with CDN, caching, etc.
 *
 * Usage:
 *   node scripts/benchmark-url.js <url> [--name "label"]
 *
 * Examples:
 *   node scripts/benchmark-url.js https://deploy-preview-109--weareamericaproject.netlify.app
 *   node scripts/benchmark-url.js https://weareamericaproject.com --name "Production"
 *
 * What it measures:
 *   - Performance score (Lighthouse, 0-100)
 *   - Core Web Vitals: FCP, LCP, CLS, TTI
 *   - Real deployment conditions (CDN, caching, compression)
 *   - Actual network transfers (realistic vs localhost)
 *
 * Output:
 *   - Console display of metrics
 *   - Saved to .benchmarks/ for comparison
 *   - Full Lighthouse report available for analysis
 *
 * Why benchmark deploy previews?
 *   - Production-realistic: Real CDN, caching, compression
 *   - No local variance: System performance doesn't affect results
 *   - Network simulation: Can test different connection speeds
 *   - External validation: Independent from development environment
 *
 * Compare results:
 *   1. Benchmark the deploy preview: npm run perf:url -- <preview-url>
 *   2. Benchmark production: npm run perf:url -- https://weareamericaproject.com
 *   3. Review metrics side-by-side in console output
 *
 * Note: Lighthouse throttles to "4G LTE" by default for consistency.
 * Results may differ from local testing due to real network conditions.
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

// Ensure benchmarks directory exists
if (!fs.existsSync(BENCHMARKS_DIR)) {
  fs.mkdirSync(BENCHMARKS_DIR, { recursive: true });
}

function runLighthouse(url, outputPath) {
  log.info(`Running Lighthouse audit on ${url}...`);
  log.info("(This may take 1-2 minutes with real network conditions)");
  try {
    execSync(
      `npx lighthouse "${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --quiet`,
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
  return imageItem ? Math.round(imageItem.transferSize / 1024) : 0;
}

function displayResults(url, results, label) {
  log.section(`Performance Results: ${label || url}`);

  console.log("\n📊 Performance Scores:");
  console.log(`   Performance:     ${results.performance}/100`);

  console.log("\n⚡ Core Web Vitals:");
  console.log(`   FCP:  ${results.fcp.toFixed(0)} ms`);
  console.log(`   LCP:  ${results.lcp.toFixed(0)} ms`);
  console.log(`   CLS:  ${results.cls.toFixed(3)}`);

  console.log("\n🔧 Other Metrics:");
  console.log(`   TTI:          ${results.tti.toFixed(0)} ms`);
  console.log(`   TBT:          ${results.tbt.toFixed(0)} ms`);
  console.log(`   Speed Index:  ${results.speedIndex.toFixed(0)} ms`);

  console.log("\n🖼️  Resources:");
  console.log(`   Image Size:   ${results.totalImageSize} KB`);

  console.log("\n🔗 URL:");
  console.log(`   ${url}`);
}

async function main() {
  const url = process.argv[2];
  const nameIndex = process.argv.indexOf("--name");
  const label = nameIndex !== -1 ? process.argv[nameIndex + 1] : null;

  if (!url) {
    log.error("Usage: node scripts/benchmark-url.js <url> [--name 'label']");
    log.error("\nExamples:");
    log.error("  node scripts/benchmark-url.js https://deploy-preview-109--weareamericaproject.netlify.app");
    log.error("  node scripts/benchmark-url.js https://weareamericaproject.com --name 'Production'");
    process.exit(1);
  }

  log.section("Web Performance Benchmark (External URL)");
  log.info(`URL: ${url}`);
  if (label) log.info(`Label: ${label}`);

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    log.error("Invalid URL");
    process.exit(1);
  }

  // Generate filename from URL
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.replace(/[^a-z0-9-]/g, "-");
  const timestamp = new Date().toISOString().slice(0, 10);
  const lighthouseJson = path.join(BENCHMARKS_DIR, `lighthouse-${hostname}-${timestamp}.json`);
  const resultsJson = path.join(BENCHMARKS_DIR, `results-${hostname}-${timestamp}.json`);

  const success = runLighthouse(url, lighthouseJson);
  if (!success) {
    process.exit(1);
  }

  const results = parseResults(lighthouseJson);
  displayResults(url, results, label);

  // Save results
  fs.writeFileSync(resultsJson, JSON.stringify({
    url,
    label: label || url,
    timestamp: new Date().toISOString(),
    ...results,
  }, null, 2));

  log.success(`Results saved to ${resultsJson}`);
  log.success(`Full report: ${lighthouseJson}`);

  console.log("\n💡 Next steps:");
  console.log(`   1. Benchmark production: npm run perf:url -- https://weareamericaproject.com`);
  console.log(`   2. Compare metrics side-by-side`);
  console.log(`   3. Check full reports in .benchmarks/ directory`);

  process.exit(0);
}

main().catch((err) => {
  log.error(err.message);
  process.exit(1);
});

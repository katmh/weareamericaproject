# Performance Benchmarking Guide

This document explains how to measure image optimization impact before and after deploying changes.

## Quick Start

### Measure Current Branch Performance
```bash
cd web
npm run perf:measure
```

This runs a full Lighthouse audit on your local build and displays:
- Performance score (0-100)
- Core Web Vitals (FCP, LCP, CLS)
- Other key metrics (TTI, TBT, Speed Index)
- Total image size

It also compares with the previous measurement if available.

### Full Benchmark (Main vs Current Branch)
```bash
cd web
npm run perf:benchmark
```

This is more comprehensive - it:
1. Checks out `main` branch, builds, and runs Lighthouse
2. Checks back to your current branch, builds, and runs Lighthouse
3. Compares all metrics side-by-side
4. Shows improvements and regressions

**Note:** This takes ~5-10 minutes and temporarily changes which branch is checked out.

---

## What Gets Measured

### Lighthouse Scores (0-100)
- **Performance** - Most relevant for image optimization
- **Accessibility**
- **Best Practices**
- **SEO**

### Core Web Vitals (Google's key metrics)
| Metric | Abbreviation | Unit | Target |
|--------|--------------|------|--------|
| First Contentful Paint | FCP | ms | < 1800 ms |
| Largest Contentful Paint | LCP | ms | < 2500 ms |
| Cumulative Layout Shift | CLS | (score) | < 0.1 |

### Additional Metrics
- **Time to Interactive (TTI)** - When page is usable
- **Total Blocking Time (TBT)** - JavaScript execution blocking
- **Speed Index** - How quickly content becomes visible
- **Image Size** - Total bytes of images loaded

---

## Understanding Results

### Image Optimization Impact
You should see significant improvements in:

1. **Image Size** ↓ (expect 60-80% reduction)
   ```
   Main: 850 KB  →  Branch: 200 KB  (76% improvement)
   ```

2. **Largest Contentful Paint** ↓ (if images are LCP)
   ```
   Main: 3200 ms  →  Branch: 2400 ms  (25% improvement)
   ```

3. **Performance Score** ↑
   ```
   Main: 65/100  →  Branch: 78/100  (+13 points)
   ```

### Interpretation Guide

| Change | Meaning |
|--------|---------|
| ↓ Performance Score drops 5+ pts | Regression, investigate |
| ↑ Performance Score gains 5-10 pts | Good improvement |
| ↑ Performance Score gains 10+ pts | Significant improvement |
| ↓ Image Size drops 20%+ | Excellent optimization |
| ↓ LCP improves 10%+ | Images likely were bottleneck |

---

## Detailed Workflow: Before/After PR

### Before Deploying

1. **Measure main branch:**
   ```bash
   git checkout main
   cd web
   npm run perf:measure
   # Note: Performance baseline metrics
   ```

2. **Measure your PR branch:**
   ```bash
   git checkout your-branch-name
   npm run perf:measure
   # Compare with main - should show improvements
   ```

3. **If major regressions, investigate:**
   - Check Lighthouse report in `.benchmarks/lighthouse-latest.json`
   - Look for blocking scripts, layout shifts, etc.

### After Deployment

4. **Wait 24 hours** for real user data

5. **Check production metrics:**
   - Visit Netlify Analytics → Web Vitals
   - Or use external tools:
     - [WebPageTest](https://webpagetest.org/)
     - [GTmetrix](https://gtmetrix.com/)
     - [PageSpeed Insights](https://pagespeed.web.dev/)

6. **Compare real user data** with your local measurements

---

## Advanced: CI/CD Integration

### GitHub Actions Workflow
You can add automated performance checks on PRs:

```yaml
name: Performance Check
on: [pull_request]

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: cd web && npm install
      - run: cd web && npm run perf:benchmark > perf-results.txt
      
      - uses: actions/upload-artifact@v2
        with:
          name: performance-results
          path: perf-results.txt
      
      - uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = fs.readFileSync('perf-results.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '```\n' + results + '\n```'
            });
```

---

## Tools for Production Monitoring

### Real User Monitoring (RUM)
After deployment, use these to measure actual users:

- **Netlify Analytics** (included with hosting)
  - Navigate to site settings → Analytics
  - View Core Web Vitals in real user data

- **Google Analytics** (if configured)
  - Reports → Engagement → Web Vitals

- **WebPageTest Pro** (paid, detailed)
  - Continuous monitoring
  - Historical trends

### One-off Testing
- **WebPageTest** (free): https://webpagetest.org/
  - Most detailed report available
  - Test from different locations/connections

- **GTmetrix** (free): https://gtmetrix.com/
  - Lighthouse + WebPageTest combined
  - Good for historical tracking

- **Google PageSpeed Insights** (free): https://pagespeed.web.dev/
  - Mobile vs desktop
  - Real user data from Chrome UX Report

---

## Results Location

Performance measurements are saved to:
```
.benchmarks/
├── latest-results.json          # Most recent measurement
├── results-history.json         # Last 20 measurements
├── main-results.json            # Main branch benchmark
├── branch-results.json          # Current branch benchmark
└── lighthouse-latest.json       # Full Lighthouse JSON report
```

You can review the full Lighthouse report:
```bash
# View detailed Lighthouse report
open .benchmarks/lighthouse-latest.json
```

---

## Troubleshooting

### "Chrome not found" error
Install Chromium:
```bash
npx @puppeteer/browsers install chrome@stable
```

### Server won't start on port 9000
Check if port is in use:
```bash
lsof -i :9000
# Kill if needed:
kill -9 <PID>
```

### Lighthouse fails silently
- Ensure Chrome/Chromium is installed
- Check disk space (build cache needs ~500MB)
- Try: `npm run build && npm run serve` manually first

---

## Example Output

```
======================================================================
Performance Measurement Tool
======================================================================

ℹ️  Building site...
✅ Build complete
ℹ️  Starting development server on port 9000...
✅ Server ready
ℹ️  Running Lighthouse audit (this may take 30-60 seconds)...
✅ Lighthouse audit complete

======================================================================
Lighthouse Audit Results
======================================================================

📊 Performance Scores:
   Performance:     78/100
   Accessibility:   95/100
   Best Practices:  92/100
   SEO:             100/100

⚡ Core Web Vitals:
   FCP: 1200 ms
   LCP: 2100 ms
   CLS: 0.05

🔧 Other Metrics:
   TTI: 3200 ms
   TBT: 150 ms
   Speed Index: 1800 ms

🖼️  Image Metrics:
   Total Image Size: 245 KB

======================================================================
Comparison with Previous Measurement
======================================================================

────────────────────────────────────────────────────────────────────
Metric                   Previous       Current         Change
────────────────────────────────────────────────────────────────────
Performance Score        65/100         78/100          ↑ +13 (20%)
FCP                      1450 ms        1200 ms         ↓ -250 (17%)
LCP                      3200 ms        2100 ms         ↓ -1100 (34%)
CLS                      0.08           0.05            ↓ -0.03 (38%)
Image Size               850 KB         245 KB          ↓ -605 (71%)
────────────────────────────────────────────────────────────────────

✨ Improvements (5):
   • Performance Score: 20% better
   • FCP: 17% better
   • LCP: 34% better
   • CLS: 38% better
   • Image Size: 71% better
```

---

## Next Steps

1. **Run `npm run perf:measure`** on your current branch to get baseline
2. **Deploy PR** and wait 24 hours
3. **Compare production metrics** with baseline using WebPageTest or Netlify Analytics
4. **Share results** in PR comments for documentation

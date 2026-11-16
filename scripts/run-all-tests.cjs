const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').AxeBuilder;
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');

console.log('=== Starting all tests ===\n');

// Start dev server
const dev = spawn('npx', ['astro', 'dev', '--port', '4321'], {
  stdio: 'pipe',
  cwd: __dirname,
  shell: true
});
dev.stderr.on('data', d => process.stderr.write(d));

function waitForServer() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      http.get('http://localhost:4321/image-test/', r => {
        clearInterval(interval);
        resolve();
      }).on('error', () => {
        if (attempts >= 30) reject(new Error('Server failed'));
      });
    }, 1000);
  });
}

(async () => {
  try {
    await waitForServer();
    console.log('Dev server UP\n');

    // === AXE-CORE (fix: use newContext) ===
    console.log('=== AXE-CORE ===');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4321/image-test/');
    
    const results = await new AxeBuilder({ page }).analyze();
    console.log(`Violations: ${results.violations.length}`);
    results.violations.forEach(v => console.log(`  - ${v.id} [${v.impact}] ${v.description}`));
    const critical = results.violations.filter(v => v.impact === 'critical');
    const serious = results.violations.filter(v => v.impact === 'serious');
    const a11yPass = critical.length === 0 && serious.length === 0;
    console.log(`Critical: ${critical.length}, Serious: ${serious.length}`);
    console.log(`PASS: ${a11yPass}\n`);

    // === LIGHTBOX TEST ===
    console.log('=== LIGHTBOX TEST ===');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focusedTag = await page.$eval(':focus', el => el.tagName);
    console.log(`Focused: <${focusedTag}>`);
    
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    
    const lightboxVisible = await page.$eval('.article-image-lightbox', el => !el.hasAttribute('hidden'));
    const ariaModal = await page.$eval('.article-image-lightbox', el => el.getAttribute('aria-modal'));
    console.log(`Lightbox visible: ${lightboxVisible}, aria-modal: ${ariaModal}`);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    const lightboxHidden = await page.$eval('.article-image-lightbox', el => el.hasAttribute('hidden'));
    const focusedAfter = await page.$eval(':focus', el => el.tagName);
    console.log(`Hidden after Escape: ${lightboxHidden}, focused: <${focusedAfter}>`);
    const lightboxPass = lightboxVisible && ariaModal === 'true' && lightboxHidden;
    console.log(`PASS: ${lightboxPass}\n`);

    // === ALT VALIDATION ===
    console.log('=== ALT VALIDATION ===');
    const tempAstro = `---
import ArticleImage from '../components/ArticleImage.astro';
import wide from '../assets/images/_template/test-wide.png';
---
<ArticleImage src={wide} alt="" />`;
    fs.writeFileSync('src/pages/alt-test.astro', tempAstro);
    
    let altPass = false;
    try {
      execSync('npm run build', { cwd: __dirname, stdio: 'pipe', encoding: 'utf8' });
      console.log('Build succeeded (should have failed)');
    } catch (e) {
      altPass = e.message?.includes('alt') || e.message?.includes('ArticleImage');
      console.log(`Build failed with alt error: ${altPass}`);
    }
    try { fs.unlinkSync('src/pages/alt-test.astro'); } catch {}
    console.log(`PASS: ${altPass}\n`);

    // === Lighthouse (headless) ===
    console.log('=== LIGHTHOUSE ===');
    try {
      execSync('npx lighthouse http://localhost:4321/image-test/ --only-categories=performance,accessibility,best-practices --output=json --output-path=reports/lighthouse.json --chrome-flags="--headless" 2>&1', { cwd: __dirname, stdio: 'pipe', encoding: 'utf8' });
      const lh = JSON.parse(fs.readFileSync('reports/lighthouse.json', 'utf8'));
      const perf = lh.categories.performance.score;
      const acc = lh.categories.accessibility.score;
      const bp = lh['best-practices'].score;
      const cls = lh.audits['cumulative-layout-shift'].numericValue;
      console.log(`Performance: ${(perf*100).toFixed(0)} (>=90)`);
      console.log(`Accessibility: ${(acc*100).toFixed(0)} (>=95)`);
      console.log(`Best practices: ${(bp*100).toFixed(0)}`);
      console.log(`CLS: ${cls.toFixed(4)} (<=0.05)`);
      console.log(`Performance PASS: ${perf >= 0.9}`);
      console.log(`Accessibility PASS: ${acc >= 0.95}`);
      console.log(`CLS PASS: ${cls <= 0.05}\n`);
    } catch (e) {
      console.log(`Lighthouse error: ${e.message}\n`);
    }

    // === SUMMARY ===
    console.log('=== FINAL SUMMARY ===');
    console.log(`Accessibility (axe): ${a11yPass ? 'PASS' : 'FAIL'}`);
    console.log(`Lightbox: ${lightboxPass ? 'PASS' : 'FAIL'}`);
    console.log(`Alt validation: ${altPass ? 'PASS' : 'FAIL'}`);
    
    await browser.close();
    dev.kill();
    console.log('\n=== DONE ===');
  } catch (err) {
    dev.kill();
    console.error('Error:', err.message);
    process.exit(1);
  }
})();

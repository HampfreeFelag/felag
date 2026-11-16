const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').AxeBuilder;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/image-test/');
  
  const results = await new AxeBuilder({ page }).analyze();
  console.log('Violations:', results.violations.length);
  results.violations.forEach(v => console.log(`  - ${v.id} [${v.impact}] ${v.description}`));
  
  // Check violations by severity
  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');
  console.log(`\nCritical: ${critical.length}, Serious: ${serious.length}`);
  
  await browser.close();
})();

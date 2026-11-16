const { chromium } = require('playwright');
const { execSync, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

// Create reports dir
fs.mkdirSync('reports/screens', { recursive: true });

// Start dev server as child process
console.log('Starting Astro dev server...');
const dev = spawn('npx', ['astro', 'dev', '--port', '4321'], {
  stdio: 'pipe',
  cwd: __dirname + '/..',
  shell: true
});

dev.stderr.on('data', (data) => {
  process.stderr.write(data);
});

// Wait for server to be ready
function waitForServer(maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      http.get('http://localhost:4321/image-test/', (res) => {
        clearInterval(interval);
        console.log('\nDev server is UP!');
        resolve();
      }).on('error', () => {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error('Dev server failed to start after 30 attempts'));
        }
      });
    }, 1000);
  });
}

(async () => {
  try {
    await waitForServer();
    
    const resolutions = [
      { name: 'mobile-320',  width: 320,  height: 568  },
      { name: 'mobile-375',  width: 375,  height: 812  },
      { name: 'tablet-768',  width: 768,  height: 1024 },
      { name: 'laptop-1024', width: 1024, height: 768  },
      { name: 'desktop-1440',width: 1440, height: 900  },
      { name: 'desktop-1920',width: 1920, height: 1080 },
    ];

    const browser = await chromium.launch();
    const results = [];

    for (const r of resolutions) {
      const page = await browser.newPage({ viewport: { width: r.width, height: r.height } });
      await page.goto('http://localhost:4321/image-test/', { waitUntil: 'networkidle' });
      await page.screenshot({ path: `reports/screens/${r.name}.png`, fullPage: true });

      const imgs = await page.$$eval('.article-image', els => els.map(el => ({
        naturalWidth: el.naturalWidth,
        clientWidth: el.clientWidth,
        offsetLeft: el.offsetLeft,
        parentWidth: el.parentElement.clientWidth,
        srcset: el.srcset ? el.srcset.split(',').length : 0,
      })));
      
      const entry = {
        resolution: r.name,
        width: r.width,
        height: r.height,
        images: imgs,
      };
      results.push(entry);
      console.log(r.name, JSON.stringify(imgs));

      await page.close();
    }
    await browser.close();

    // Stop dev server
    dev.kill();

    // Validate
    console.log('\n=== VALIDATION ===');
    let allPass = true;
    for (const r of results) {
      for (let i = 0; i < r.images.length; i++) {
        const img = r.images[i];
        // Check 1: clientWidth <= parentWidth
        if (img.clientWidth > img.parentWidth) {
          console.log(`FAIL ${r.resolution} img[${i}]: clientWidth(${img.clientWidth}) > parentWidth(${img.parentWidth})`);
          allPass = false;
        }
        // Check 2: narrow image centered (offsetLeft > 0)
        if (i === 1 && img.offsetLeft <= 0) {
          console.log(`FAIL ${r.resolution} img[${i}]: narrow image NOT centered (offsetLeft=${img.offsetLeft})`);
          allPass = false;
        }
        // Check 3: wide image has srcset >= 3
        if (i === 0 && img.srcset < 3) {
          console.log(`FAIL ${r.resolution} img[${i}]: wide image srcset=${img.srcset} (expected >= 3)`);
          allPass = false;
        }
        // Check 4: no blur (naturalWidth >= clientWidth)
        if (img.naturalWidth < img.clientWidth) {
          console.log(`FAIL ${r.resolution} img[${i}]: naturalWidth(${img.naturalWidth}) < clientWidth(${img.clientWidth})`);
          allPass = false;
        }
      }
      console.log(`${r.resolution}: ALL CHECKS PASSED`);
    }
    console.log(allPass ? '\n=== ALL VALIDATIONS PASSED ===' : '\n=== SOME VALIDATIONS FAILED ===');
  } catch (err) {
    dev.kill();
    console.error('Error:', err.message);
    process.exit(1);
  }
})();

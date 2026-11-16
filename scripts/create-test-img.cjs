const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'assets', 'images', '_template');
fs.mkdirSync(outDir, { recursive: true });

async function createTestImage() {
  const w = 1200, h = 675;
  const data = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = Math.floor(i / w);
    data[i * 4]     = Math.floor(20 + (x / w) * 40);
    data[i * 4 + 1] = Math.floor(50 + (y / h) * 30);
    data[i * 4 + 2] = Math.floor(100 + ((x + y) / (w + h)) * 60);
    data[i * 4 + 3] = 255;
  }
  await sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'test-article.png'));
  console.log('test-article.png created (1200x675)');
}

createTestImage().catch(console.error);

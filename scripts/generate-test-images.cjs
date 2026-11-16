const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'assets', 'images', '_template');
fs.mkdirSync(outDir, { recursive: true });

async function createWide() {
  const w = 1600, h = 900;
  const data = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = Math.floor(i / w);
    data[i * 4]     = Math.floor(20 + (x / w) * 30);
    data[i * 4 + 1] = Math.floor(40 + (y / h) * 20);
    data[i * 4 + 2] = Math.floor(80 + ((x + y) / (w + h)) * 60);
    data[i * 4 + 3] = 255;
  }
  await sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'test-wide.png'));
  console.log('test-wide.png created (1600x900)');
}

async function createNarrow() {
  const w = 400, h = 300;
  const data = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = Math.floor(i / w);
    data[i * 4]     = Math.floor(40 + (x / w) * 20);
    data[i * 4 + 1] = Math.floor(80 + (y / h) * 40);
    data[i * 4 + 2] = Math.floor(60 + ((x + y) / (w + h)) * 30);
    data[i * 4 + 3] = 255;
  }
  await sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'test-narrow.png'));
  console.log('test-narrow.png created (400x300)');
}

Promise.all([createWide(), createNarrow()])
  .then(() => console.log('All test images generated'))
  .catch(err => console.error('Error:', err));

/**
 * One-off generator: rebuilds favicon/app icons from the brand source PNG
 * (blue rune glyph on white) so every platform shows the same icon.
 *
 * Source: HampfreeBlog-Private/assets/brand/felag-logo-source.png (1097x1097)
 * Glyph bbox measured inside it: left 410, top 143, width 291, height 750.
 *
 * Run: node scripts/gen-favicons.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC = 'D:/Projects/Github-crypto/HampfreeBlog-Private/assets/brand/felag-logo-source.png';
const OUT = path.join(ROOT, 'public');

const GLYPH = { left: 410, top: 143, width: 291, height: 750 };

async function render(size, ratio) {
	const glyphH = Math.max(1, Math.round(size * ratio));
	const glyph = await sharp(SRC)
		.extract(GLYPH)
		.resize({ height: glyphH, kernel: 'lanczos3' })
		.png()
		.toBuffer();

	const meta = await sharp(glyph).metadata();
	const left = Math.round((size - meta.width) / 2);
	const top = Math.round((size - meta.height) / 2);

	return sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		},
	})
		.composite([{ input: glyph, left, top }])
		.png({ compressionLevel: 9 })
		.toBuffer();
}

/** Build a real ICO container with PNG-compressed frames (Vista+ / all browsers). */
function buildIco(frames) {
	const count = frames.length;
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(count, 4);

	const entries = [];
	let offset = 6 + count * 16;
	for (const { size, data } of frames) {
		const e = Buffer.alloc(16);
		e.writeUInt8(size >= 256 ? 0 : size, 0); // width
		e.writeUInt8(size >= 256 ? 0 : size, 1); // height
		e.writeUInt8(0, 2); // palette
		e.writeUInt8(0, 3); // reserved
		e.writeUInt16LE(1, 4); // color planes
		e.writeUInt16LE(32, 6); // bits per pixel
		e.writeUInt32LE(data.length, 8);
		e.writeUInt32LE(offset, 12);
		entries.push(e);
		offset += data.length;
	}

	return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

(async () => {
	const targets = [
		{ file: 'favicon-96x96.png', size: 96, ratio: 0.86 },
		{ file: 'apple-touch-icon.png', size: 180, ratio: 0.8 },
		{ file: 'web-app-manifest-192x192.png', size: 192, ratio: 0.6 },
		{ file: 'web-app-manifest-512x512.png', size: 512, ratio: 0.6 },
		// Organization logo для JSON-LD (Google требует квадрат не меньше 112x112)
		{ file: 'logo.png', size: 512, ratio: 0.8 },
	];

	for (const t of targets) {
		const buf = await render(t.size, t.ratio);
		fs.writeFileSync(path.join(OUT, t.file), buf);
		console.log(`${t.file}: ${t.size}x${t.size}, ${buf.length} bytes`);
	}

	const frames = [];
	for (const [size, ratio] of [
		[16, 0.92],
		[32, 0.9],
		[48, 0.88],
	]) {
		frames.push({ size, data: await render(size, ratio) });
	}
	const ico = buildIco(frames);
	fs.writeFileSync(path.join(OUT, 'favicon.ico'), ico);
	console.log(`favicon.ico: 16/32/48, ${ico.length} bytes`);
})();

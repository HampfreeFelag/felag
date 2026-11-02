import fs from 'node:fs';
import path from 'node:path';

// Run from repo root: node scripts/check-internal-links.mjs
const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, 'src', 'content');

const langDirs = [
  { lang: 'ru', dir: path.join(contentRoot, 'blog-ru') },
  { lang: 'en', dir: path.join(contentRoot, 'blog-en') }
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && (p.endsWith('.md') || p.endsWith('.mdx'))) out.push(p);
  }
  return out;
}

function collectSlugs(langDir) {
  const slugs = new Set();
  // Articles live in blog-{lang}/saga/*/index.md (recursive)
  const sagaDir = path.join(langDir, 'saga');
  if (!fs.existsSync(sagaDir)) return slugs;
  const files = walk(langDir);
  for (const f of files) {
    // Extract slug: blog-{lang}/saga/<slug>/index.md
    const rel = path.relative(langDir, f);
    const parts = rel.split(path.sep);
    if (parts[0] === 'saga' && parts.length >= 2) {
      slugs.add(parts[1]);
    }
  }
  return slugs;
}

const slugsByLang = Object.fromEntries(
  langDirs.map(({ lang, dir }) => [lang, collectSlugs(dir)])
);

const linkRe = /\]\(\/(ru|en)\/saga\/([a-z0-9-]+)(?:\/)?(?:#[^)]+)?\)/gi;

const missing = [];

for (const { lang, dir } of langDirs) {
  const files = walk(dir);
  for (const filePath of files) {
    const text = fs.readFileSync(filePath, 'utf8');
    let m;
    while ((m = linkRe.exec(text)) !== null) {
      const targetLang = m[1];
      const targetSlug = m[2];
      if (!slugsByLang[targetLang]?.has(targetSlug)) {
        missing.push({ from: filePath, link: m[0], targetLang, targetSlug });
      }
    }
  }
}

if (missing.length === 0) {
  console.log('✅ Internal library links OK (no missing slugs).');
  process.exit(0);
}

console.error(`❌ Found ${missing.length} missing internal saga link(s):`);
for (const item of missing) {
  console.error(`- from: ${item.from}`);
  console.error(`  link: ${item.link}`);
  console.error(`  missing: /${item.targetLang}/saga/${item.targetSlug}/`);
}
process.exit(1);


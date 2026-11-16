/**
 * Language validation script for FÉLAG blog.
 *
 * Scans all files in src/content/blog-en/ (including dotfiles, assets folders,
 * .md, .mdx content, and file names) for Cyrillic characters.
 *
 * If Cyrillic is found, exits with code 1 and reports the offending file.
 *
 * Usage:
 *   node scripts/validate-lang.mjs
 *
 * Integrated into package.json "build" script.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const CYRILLIC_REGEX = /[а-яА-ЯёЁ]/;
const BLOG_EN_DIR = join(process.cwd(), 'src', 'content', 'blog-en');

// File extensions to scan (includes dotfiles like .template.md)
const TEXT_EXTENSIONS = new Set([
  '.md', '.mdx', '.json', '.yaml', '.yml', '.toml',
  '.txt', '.csv', '.html', '.css', '.js', '.mjs', '.ts',
]);

// Extensions that are binary/image (skip)
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico',
  '.avif', '.bmp', '.tiff', '.woff', '.woff2', '.ttf', '.eot',
]);

function getExtension(fileName) {
  // Handle dotfiles: .template.md → .md
  // Handle double extensions: file.tar.gz → .gz
  const dotIndex = fileName.indexOf('.');
  if (dotIndex === -1) return ''; // no extension

  // If first char is dot and there's another dot → dotfile with extension
  if (dotIndex === 0) {
    const rest = fileName.slice(1);
    const secondDot = rest.indexOf('.');
    if (secondDot === -1) return ''; // bare dotfile like .gitignore
    return rest.slice(secondDot).toLowerCase();
  }

  // Normal file: find last dot
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot === 0) return '';
  return fileName.slice(lastDot).toLowerCase();
}

async function scanDirectory(dir, results) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Check file name for Cyrillic
    if (CYRILLIC_REGEX.test(entry.name)) {
      results.push({ path: fullPath, reason: `filename: "${entry.name}"` });
      continue;
    }

    if (entry.isDirectory()) {
      await scanDirectory(fullPath, results);
    } else {
      const ext = getExtension(entry.name);

      // Skip binary/image files
      if (BINARY_EXTENSIONS.has(ext)) continue;

      // Only scan text files (or files with no extension — scan them too)
      if (ext !== '' && !TEXT_EXTENSIONS.has(ext)) continue;

      try {
        const content = await readFile(fullPath, 'utf-8');
        if (CYRILLIC_REGEX.test(content)) {
          const match = content.match(CYRILLIC_REGEX);
          if (match) {
            results.push({
              path: fullPath,
              reason: `content: found Cyrillic character "${match[0]}"`,
            });
          }
        }
      } catch {
        // Skip files that can't be read as UTF-8 (binary, permission denied, etc.)
      }
    }
  }
}

async function main() {
  console.log('Validating language integrity for blog-en...');

  if (!(await readdir(BLOG_EN_DIR).catch(() => null))) {
    console.log('  blog-en directory not found, skipping.');
    process.exit(0);
  }

  const violations = [];
  await scanDirectory(BLOG_EN_DIR, violations);

  if (violations.length > 0) {
    console.error('\nCYRILLIC CHARACTERS FOUND IN blog-en/');
    console.error('   English content must NOT contain Cyrillic characters.\n');

    for (const v of violations) {
      const relPath = v.path.replace(BLOG_EN_DIR + (process.platform === 'win32' ? '\\' : '/'), '');
      console.error(`   ${relPath}`);
      console.error(`     → ${v.reason}`);
    }

    console.error('\nFix: remove all Cyrillic characters from blog-en content, filenames, and paths.\n');
    process.exit(1);
  }

  console.log('  No Cyrillic characters found in blog-en/. All clean.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

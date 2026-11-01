import { visit } from 'unist-util-visit';

const SITE_HOST = 'felag.online';
const ICON_PATH = 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3 21 3 21 9 M10 14 21 3';

const isExternal = (href) => {
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return false;
  try {
    const h = new URL(href).hostname.replace(/^www\./, '');
    return h !== SITE_HOST && !h.endsWith(`.${SITE_HOST}`);
  } catch { return false; }
};

export function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !isExternal(node.properties?.href)) return;
      node.properties.className = [...(node.properties.className || []), 'external-link'];
      node.properties.target = '_blank';
      node.properties.rel = [...new Set([...(node.properties.rel || []), 'noopener', 'noreferrer'])];
      node.children.push({
        type: 'element',
        tagName: 'svg',
        properties: { className: ['external-icon'], viewBox: '0 0 24 24', fill: 'none',
          stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round',
          strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
        children: [{ type: 'element', tagName: 'path',
          properties: { d: ICON_PATH }, children: [] }],
      });
    });
  };
}

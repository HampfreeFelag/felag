/**
 * Wraps every <img> in the article content with a figure wrapper
 * and appends a lightbox trigger button.
 *
 * This enables the client-side lightbox for all article images
 * without requiring manual component usage in markdown.
 */
import { visitParents } from 'unist-util-visit-parents';

// SVG icon for the lightbox trigger (magnifying glass)
const LIGHTBOX_TRIGGER_SVG = {
  type: 'element',
  tagName: 'svg',
  properties: {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '20',
    height: '20',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  children: [
    { type: 'element', tagName: 'circle', properties: { cx: '11', cy: '11', r: '8' }, children: [] },
    { type: 'element', tagName: 'line', properties: { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }, children: [] },
    { type: 'element', tagName: 'line', properties: { x1: '11', y1: '8', x2: '11', y2: '14' }, children: [] },
    { type: 'element', tagName: 'line', properties: { x1: '8', y1: '11', x2: '14', y2: '11' }, children: [] },
  ],
};

export function rehypeWrapArticleImages() {
  return (tree) => {
    visitParents(tree, 'element', (node, parents) => {
      if (node.tagName !== 'img' || !node.properties?.src) return;

      const alt = node.properties.alt || '';
      const src = node.properties.src;
      const parent = parents[parents.length - 1];
      const index = parent.children.indexOf(node);

      // Create figure wrapper containing the img + lightbox trigger
      const figure = {
        type: 'element',
        tagName: 'figure',
        properties: { className: ['article-image-wrapper'] },
        children: [
          // The original img node (reuse)
          node,
          // Lightbox trigger button with SVG icon
          {
            type: 'element',
            tagName: 'button',
            properties: {
              className: ['lightbox-trigger'],
              'aria-label': `Увеличить изображение: ${alt}`,
              'data-src': src,
            },
            children: [LIGHTBOX_TRIGGER_SVG],
          },
        ],
      };

      // Replace img with figure in parent
      parent.children[index] = figure;
    });
  };
}

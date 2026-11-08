/**
 * Wraps every top-level H2 and the content that follows it into
 * <section class="prose-section">.
 *
 * Why: the section divider must not belong to the anchor target. The heading
 * keeps its `id` (assigned later by Astro's rehypeHeadingIds) and its
 * `scroll-margin-top`, while the hairline is drawn by the wrapper 48px above
 * the heading. When an anchor is followed, the wrapper's top edge slides under
 * the sticky header instead of hanging in the gap below it.
 */
export function rehypeSectionWrappers() {
  return (tree) => {
    const result = [];
    let currentSection = null;

    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        currentSection = {
          type: 'element',
          tagName: 'section',
          properties: { className: ['prose-section'] },
          children: [],
        };
        result.push(currentSection);
      }

      if (currentSection) {
        currentSection.children.push(node);
      } else {
        result.push(node);
      }
    }

    tree.children = result;
  };
}

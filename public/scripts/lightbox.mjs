/**
 * Client-side lightbox for article images.
 *
 * Works with:
 * - .article-image-wrapper elements (created by rehype-wrap-article-images.mjs)
 * - Single shared .article-image-lightbox overlay (in BlogPost.astro)
 *
 * Features:
 * - Scroll-lock on both html + body (iOS-compatible with touchmove)
 * - Focus management with preventScroll
 * - aria-hidden on body for screen readers
 * - Full focus trap (Tab cycling)
 * - View Transitions compatible (single rAF init)
 */
(function() {
  'use strict';

  // ─── State ───────────────────────────────────────────────
  let lightbox = null;
  let lightboxImg = null;
  let closeBtn = null;
  let backdrop = null;
  let lastFocusedElement = null;
  let touchMoveHandler = null;
  let keydownHandler = null;

  // ─── Init (single rAF — View Transitions safe) ───────────
  function initLightbox() {
    lightbox = document.querySelector('.article-image-lightbox');
    if (!lightbox) return;

    lightboxImg = lightbox.querySelector('.lightbox-img');
    closeBtn = lightbox.querySelector('.lightbox-close');
    backdrop = lightbox.querySelector('.lightbox-backdrop');

    // Attach click handlers to all trigger buttons (once at init)
    document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(trigger);
      });
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeLightbox();
    });

    backdrop.addEventListener('click', closeLightbox);
  }

  // ─── Open ────────────────────────────────────────────────
  function openLightbox(trigger) {
    lastFocusedElement = document.activeElement;

    // Set image source and alt
    const src = trigger.getAttribute('data-src');
    const ariaLabel = trigger.getAttribute('aria-label') || '';
    const alt = ariaLabel.replace('Увеличить изображение: ', '') || '';

    lightboxImg.src = src;
    lightboxImg.alt = alt;

    // Remove hidden to show overlay
    lightbox.removeAttribute('hidden');

    // ── Scroll-lock (html + body for Astro ViewTransitions) ──
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // ── iOS touchmove prevention ──
    touchMoveHandler = (e) => {
      // Only prevent if touching inside the lightbox content
      if (e.target.closest('.lightbox-content')) {
        e.preventDefault();
      }
    };
    lightbox.addEventListener('touchmove', touchMoveHandler, { passive: false });

    // ── aria-hidden on body for screen readers ──
    document.body.setAttribute('aria-hidden', 'true');

    // ── Focus on close button ──
    closeBtn.focus();

    // ── Keyboard handlers ──
    keydownHandler = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'Tab') {
        trapTabKey(e);
      }
    };
    document.addEventListener('keydown', keydownHandler);
  }

  // ─── Close ───────────────────────────────────────────────
  function closeLightbox() {
    // ── Remove hidden first ──
    lightbox.setAttribute('hidden', '');

    // ── Remove scroll-lock BEFORE focus return ──
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // ── Remove iOS touch handler ──
    if (touchMoveHandler) {
      lightbox.removeEventListener('touchmove', touchMoveHandler);
      touchMoveHandler = null;
    }

    // ── Restore aria-hidden ──
    document.body.removeAttribute('aria-hidden');

    // ── Remove keyboard handlers ──
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }

    // ── Return focus with preventScroll (after scroll is restored) ──
    if (lastFocusedElement) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  // ─── Focus Trap ──────────────────────────────────────────
  function trapTabKey(e) {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableElements = Array.from(
      lightbox.querySelectorAll(focusableSelectors.join(', '))
    ).filter((el) => {
      // Exclude elements hidden by CSS
      return el.offsetParent !== null;
    });

    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: if on first element, wrap to last
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab: if on last element, wrap to first
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  // ─── Boot ────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(initLightbox);
    });
  } else {
    requestAnimationFrame(initLightbox);
  }
})();

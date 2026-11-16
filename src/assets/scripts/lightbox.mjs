document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.article-image-wrapper').forEach(wrapper => {
    const trigger = wrapper.querySelector('.lightbox-trigger');
    const lightbox = wrapper.querySelector('.article-image-lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    let lastFocusedElement = null;

    const openLightbox = () => {
      lastFocusedElement = document.activeElement;
      lightboxImg.src = trigger.getAttribute('data-src');
      lightboxImg.alt = trigger.getAttribute('aria-label')?.replace('Увеличить изображение: ', '') || '';
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
      document.addEventListener('keydown', handleKeydown);
      backdrop.addEventListener('click', closeLightbox);
    };

    const closeLightbox = () => {
      lightbox.setAttribute('hidden', '');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
      backdrop.removeEventListener('click', closeLightbox);
      if (lastFocusedElement) lastFocusedElement.focus();
    };

    const handleKeydown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };

    trigger.addEventListener('click', openLightbox);
    closeBtn.addEventListener('click', closeLightbox);
  });
});

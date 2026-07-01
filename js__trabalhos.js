/* ── LIGHTBOX ── */
(function () {
  const overlay  = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const lbCount  = document.getElementById('lb-count');

  /* Collect all gallery images in DOM order */
  const cards = Array.from(document.querySelectorAll('.works-grid .work-card'));
  const images = cards.map(card => {
    const img = card.querySelector('.work-img');
    return { src: img.src, alt: img.alt };
  });

  let current = 0;
  let startX  = 0;

  function show(index) {
    current = (index + images.length) % images.length;
    lbImg.style.opacity = '0';
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    lbImg.onload = () => { lbImg.style.opacity = '1'; };
    lbCount.textContent = (current + 1) + ' / ' + images.length;
  }

  function open(index) {
    show(index);
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  /* Attach click to each card */
  cards.forEach((card, i) => {
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });

  /* Click backdrop to close */
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  /* Keyboard */
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('lb-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  /* Touch swipe */
  overlay.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? show(current + 1) : show(current - 1);
  });
})();

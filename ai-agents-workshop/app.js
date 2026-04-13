(function () {
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  let current = 0;

  const progressBar = document.getElementById('progressBar');
  const slideCounter = document.getElementById('slideCounter');

  /* ===== NAVIGATION ===== */
  function updateUI() {
    progressBar.style.width = ((current + 1) / total * 100) + '%';
    slideCounter.textContent = (current + 1) + ' / ' + total;
  }

  function goTo(index) {
    if (index < 0 || index >= total || index === current) return;
    slides[current].classList.remove('active');
    slides[current].classList.add('exit');

    const prev = current;
    current = index;
    slides[current].classList.add('active');
    updateUI();

    // Reset fade animations on new slide
    slides[current].querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    });

    // Reset stagger-reveal elements: briefly remove active so transition replays
    slides[current].querySelectorAll('.stagger-reveal').forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.95)';
      el.offsetHeight; // reflow
      el.style.transition = '';
      el.style.opacity = '';
      el.style.transform = '';
    });

    // Reset landing animation elements
    slides[current].querySelectorAll('.landing-el').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });

    setTimeout(() => slides[prev].classList.remove('exit'), 700);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault(); next();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault(); prev();
    }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });

  // Click navigation - right half forward, left half back
  document.addEventListener('click', function (e) {
    // Ignore clicks on interactive elements
    if (e.target.closest('.card, .component-card, .agent-row, .conn-type, .skill-step, .tool-item, .chart-point, .loop-node')) return;
    if (e.clientX > window.innerWidth * 0.5) next();
    else prev();
  });

  // Touch/swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });

  // Scroll wheel with cooldown
  let wheelCooldown = false;
  document.addEventListener('wheel', function (e) {
    if (wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => wheelCooldown = false, 700);
    e.deltaY > 0 ? next() : prev();
  });

  /* ===== MOUSE PARALLAX ===== */
  document.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    // Move parallax backgrounds
    document.querySelectorAll('.slide.active .parallax-bg').forEach(bg => {
      bg.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    });

    // Subtle tilt on cards in active slide
    document.querySelectorAll('.slide.active .card, .slide.active .component-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      if (Math.abs(cx) < 1 && Math.abs(cy) < 1) {
        card.style.transform = `perspective(800px) rotateY(${cx * 4}deg) rotateX(${-cy * 4}deg) translateY(-2px)`;
      }
    });

    // Move grid overlay slightly
    document.querySelectorAll('.slide.active .grid-overlay').forEach(grid => {
      grid.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    });
  });

  // Reset card transforms on mouse leave
  document.querySelectorAll('.card, .component-card').forEach(card => {
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  /* ===== ANIMATE CHART ON REVEAL ===== */
  const chartObserver = new MutationObserver(function () {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide && activeSlide.querySelector('.chart-container')) {
      animateChart();
    }
  });

  function animateChart() {
    const points = document.querySelectorAll('.chart-point');
    points.forEach((p, i) => {
      p.style.opacity = '0';
      p.style.transform = 'translate(-50%, 50%) scale(0)';
      setTimeout(() => {
        p.style.opacity = '1';
        p.style.transform = 'translate(-50%, 50%) scale(1)';
      }, 300 + i * 200);
    });
  }

  // Observe slide changes for chart animation
  slides.forEach(slide => {
    const obs = new MutationObserver(() => {
      if (slide.classList.contains('active') && slide.querySelector('.chart-container')) {
        animateChart();
      }
    });
    obs.observe(slide, { attributes: true, attributeFilter: ['class'] });
  });

  /* ===== INTERACTIVE TOOLTIPS ===== */
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function (e) {
      const tip = document.createElement('div');
      tip.className = 'tooltip-popup';
      tip.textContent = this.dataset.tooltip;
      tip.style.cssText = `
        position:fixed; background:rgba(33,29,88,0.95); color:white;
        padding:8px 16px; border-radius:8px; font-size:14px; font-weight:500;
        pointer-events:none; z-index:200; border:1px solid var(--green);
        top:${e.clientY - 40}px; left:${e.clientX}px;
        animation: fadeIn 0.2s ease;
      `;
      document.body.appendChild(tip);
      this._tooltip = tip;
    });
    el.addEventListener('mouseleave', function () {
      if (this._tooltip) { this._tooltip.remove(); this._tooltip = null; }
    });
  });

  /* ===== AGENDA HOVER PREVIEW ===== */
  const agendaItems = document.querySelectorAll('.agenda-item');
  const agendaPanels = document.querySelectorAll('.agenda-preview-panel');

  function setAgendaPanel(id) {
    if (!id) return;
    agendaItems.forEach(item => item.classList.toggle('active', item.dataset.agenda === id));
    agendaPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === id));
  }

  agendaItems.forEach(item => {
    item.addEventListener('mouseenter', () => setAgendaPanel(item.dataset.agenda));
    item.addEventListener('focus', () => setAgendaPanel(item.dataset.agenda));
  });

  /* ===== INIT ===== */
  setAgendaPanel('1');
  updateUI();
})();

/* ─────────────────────────────────────────
   PAGE LOADER
   Shows only on the very first visit per browser session.
   Any reload or re-navigation skips it entirely.
───────────────────────────────────────── */
(function createLoader() {
  const SEEN_KEY = 'hb_loader_seen';

  // sessionStorage can throw in Safari private mode — wrap safely
  let alreadySeen = false;
  try { alreadySeen = !!sessionStorage.getItem(SEEN_KEY); } catch (e) {}

  if (alreadySeen) {
    window.addEventListener('load', () => triggerHeroReveal());
    return;
  }

  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) {}

  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-text">Loading</div>
    <div class="loader-bar"><div class="loader-fill"></div></div>
  `;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 700);
      triggerHeroReveal();
    }, 1700);
  });
})();

/* ─────────────────────────────────────────
   TOUCH / POINTER DETECTION
   isTouch = true on phones, tablets, stylus.
   isMouse = true on desktop with real pointer.
───────────────────────────────────────── */
const isMouse = window.matchMedia('(pointer: fine)').matches;
const isTouch = !isMouse;

/* ─────────────────────────────────────────
   CUSTOM CURSOR  (mouse-only)
───────────────────────────────────────── */
if (isMouse) {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

  const hoverTargets = 'a, button, .skill-card, .cert-card, .project-card, .btn, .project-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  (function animateCursor() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();
}

/* ─────────────────────────────────────────
   NAVBAR SCROLL BEHAVIOUR
───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─────────────────────────────────────────
   HAMBURGER / MOBILE NAV
───────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mnav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on backdrop tap/click
document.addEventListener('click', e => {
  if (mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER — with fallback
   On old browsers without IntersectionObserver,
   show everything immediately so the page is usable.
───────────────────────────────────────── */
function showAllReveal() {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

if (!('IntersectionObserver' in window)) {
  // Fallback: show all animated elements immediately
  showAllReveal();
  document.querySelectorAll('.skill-fill').forEach(fill => {
    if (fill.dataset.w) fill.style.width = fill.dataset.w + '%';
  });
} else {
  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  function observeReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  observeReveal();

  /* ── Skill bar animation ── */
  const skillBarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill && fill.dataset.w) {
          setTimeout(() => { fill.style.width = fill.dataset.w + '%'; }, 200);
        }
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(card => skillBarObserver.observe(card));

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start    = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  const aboutSection = document.querySelector('.about');
  if (aboutSection) counterObserver.observe(aboutSection);

  /* ── Cert cards stagger ── */
  const certObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.cert-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
        });
        certObserver.disconnect();
      }
    });
  }, { threshold: 0.15 });
  const certSection = document.querySelector('.certifications');
  if (certSection) certObserver.observe(certSection);

  /* ── Active nav link highlight ── */
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) a.style.color = '#fff';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObserver.observe(s));

  /* Re-observe after loader finishes */
  window.addEventListener('load', () => setTimeout(observeReveal, 1800));
}

/* ─────────────────────────────────────────
   HERO REVEAL  (called by loader & fallback)
───────────────────────────────────────── */
function triggerHeroReveal() {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL FOR NAV LINKS
   Falls back gracefully on browsers that don't
   support scrollTo({ behavior: 'smooth' }).
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id     = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    try {
      window.scrollTo({ top, behavior: 'smooth' });
    } catch (_) {
      // Fallback for very old iOS Safari
      window.scrollTo(0, top);
    }
  });
});

/* ─────────────────────────────────────────
   PARALLAX — HERO BG GRID  (desktop only)
───────────────────────────────────────── */
if (isMouse) {
  const heroBgGrid = document.querySelector('.hero-bg-grid');
  if (heroBgGrid) {
    window.addEventListener('scroll', () => {
      heroBgGrid.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }, { passive: true });
  }
}

/* ─────────────────────────────────────────
   CURSOR GLOW  (mouse-only — skipped on touch)
───────────────────────────────────────── */
if (isMouse) {
  (function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let gx = window.innerWidth  / 2;
    let gy = window.innerHeight / 2;
    let tx = gx, ty = gy;
    let hue = 75;
    const HUE_SPEED = 0.04;

    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

    function frame() {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      hue = (hue + HUE_SPEED) % 360;
      const color = `hsla(${hue}, 100%, 62%, 0.32)`;
      glow.style.transform = `translate(${gx - 350}px, ${gy - 350}px)`;
      glow.style.setProperty('--glow-color', color);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTONS  (mouse-only)
───────────────────────────────────────── */
if (isMouse) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ─────────────────────────────────────────
   TILT — SKILL CARDS  (mouse-only)
───────────────────────────────────────── */
if (isMouse) {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rotX = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -8;
      const rotY = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  8;
      card.style.transform  = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      card.style.transition = 'transform 0.1s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    });
  });
}

/* ─────────────────────────────────────────
   PROJECT CARDS — cursor spotlight  (mouse-only)
───────────────────────────────────────── */
if (isMouse) {
  document.querySelectorAll('.project-card').forEach(card => {
    const spotlight = card.querySelector('.project-spotlight');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      if (spotlight) {
        spotlight.style.setProperty('--sx', x + '%');
        spotlight.style.setProperty('--sy', y + '%');
      }
      const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
      card.style.transform  = `translate(${dx * 0.4}px, ${dy * 0.4 - 8}px)`;
      card.style.transition = 'transform 0.08s linear, border-color 0.4s, box-shadow 0.4s';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s, box-shadow 0.4s';
    });
  });
}

/* ─────────────────────────────────────────
   PROJECT MODALS — open / close
───────────────────────────────────────── */
function openModal(id) {
  const modal = document.getElementById('proj-modal-' + id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('.proj-modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  if (!document.querySelector('.proj-modal.open')) {
    document.body.style.overflow = '';
  }
}

// "Explore →" buttons navigate to project page
const projectPages = { '1': 'project-1.html', '2': 'project-2.html', '3': 'project-3.html' };
document.querySelectorAll('.project-link[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = projectPages[btn.dataset.open];
  });
});

// Overlay click/tap opens modal
document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.project-overlay')?.addEventListener('click', () => {
    openModal(card.dataset.project);
  });
});

document.querySelectorAll('.proj-modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.proj-modal')));
});
document.querySelectorAll('.proj-modal-close-btn').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.proj-modal')));
});
document.querySelectorAll('.proj-modal-backdrop').forEach(bd => {
  bd.addEventListener('click', () => closeModal(bd.closest('.proj-modal')));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const open = document.querySelector('.proj-modal.open');
    if (open) closeModal(open);
  }
});

/* ─────────────────────────────────────────
   TEXT GLITCH ON HERO NAME  (reduced on mobile)
───────────────────────────────────────── */
const heroName = document.querySelector('.hero-name');
if (heroName && isMouse) {
  // Only run the filter glitch on desktop — avoids jank on mobile GPU
  setInterval(() => {
    heroName.style.filter = 'blur(1.5px)';
    setTimeout(() => { heroName.style.filter = ''; }, 80);
  }, 6000);
}

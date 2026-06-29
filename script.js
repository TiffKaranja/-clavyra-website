// ── Desktop nav visibility ─────────────────────────────
const deskNav = document.getElementById('desk-nav');
if (deskNav) {
  const mq = window.matchMedia('(min-width: 768px)');
  function syncNav(e) { deskNav.style.display = e.matches ? 'flex' : 'none'; deskNav.style.alignItems = 'center'; deskNav.style.gap = '28px'; }
  mq.addEventListener('change', syncNav);
  syncNav(mq);
}

// ── Mobile menu ────────────────────────────────────────
const hamBtn  = document.getElementById('ham-btn');
const mobMenu = document.getElementById('mob-menu');
const hb1 = document.getElementById('hb1');
const hb2 = document.getElementById('hb2');
const hb3 = document.getElementById('hb3');
let mobOpen = false;

function toggleMob(state) {
  mobOpen = state;
  hamBtn.setAttribute('aria-expanded', String(state));
  mobMenu.classList.toggle('open', state);
  hb1.style.transform = state ? 'translateY(6.5px) rotate(45deg)' : '';
  hb2.style.opacity   = state ? '0' : '';
  hb3.style.transform = state ? 'translateY(-6.5px) rotate(-45deg)' : '';
}

if (hamBtn) {
  hamBtn.addEventListener('click', () => toggleMob(!mobOpen));
  mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMob(false)));
}

// ── Services dropdown (desktop, click to open) ─────────
const dropBtn  = document.getElementById('nav-drop-btn');
const dropMenu = document.getElementById('nav-drop-menu');
if (dropBtn && dropMenu) {
  dropBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropBtn.getAttribute('aria-expanded') === 'true';
    dropBtn.setAttribute('aria-expanded', String(!open));
    dropMenu.classList.toggle('open', !open);
  });
  document.addEventListener('click', (e) => {
    if (!dropMenu.contains(e.target) && !dropBtn.contains(e.target)) {
      dropBtn.setAttribute('aria-expanded', 'false');
      dropMenu.classList.remove('open');
    }
  });
}

// ── Mobile services sub-menu toggle ─────────────────────
const mobDropBtn = document.getElementById('mob-drop-btn');
const mobSublist = document.getElementById('mob-sublist');
if (mobDropBtn && mobSublist) {
  mobDropBtn.addEventListener('click', () => {
    const open = mobDropBtn.getAttribute('aria-expanded') === 'true';
    mobDropBtn.setAttribute('aria-expanded', String(!open));
    mobSublist.style.display = open ? 'none' : 'flex';
  });
}

// ── FAQ accordion ──────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const id   = btn.dataset.target;
    const body = document.getElementById(id);
    const open = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
    if (!open) { btn.setAttribute('aria-expanded', 'true'); body.classList.add('open'); }
  });
});

// ── Header opacity on scroll ───────────────────────────
const hdr = document.getElementById('site-header');
if (hdr) {
  window.addEventListener('scroll', () => {
    hdr.style.background = window.scrollY > 50
      ? 'rgba(8,8,8,0.98)'
      : 'rgba(10,10,10,0.92)';
  }, { passive: true });
}

// ── Scroll to top ──────────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Active nav link highlighting ───────────────────────
(function highlightActiveNav() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const page = path === '/' || path === '' ? '/' : path;
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === page) a.classList.add('active');
  });
})();

// ── Contact form (no backend yet — friendly confirmation) ─
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message sent';
    btn.disabled = true;
    contactForm.reset();
  });
}

// ── Email capture (blog) ───────────────────────────────
const emailForm = document.getElementById('email-capture-form');
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = emailForm.querySelector('button[type="submit"]');
    btn.textContent = 'Subscribed';
    btn.disabled = true;
  });
}

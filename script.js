/* ════════════════════════════════════════════════════
   RAYZA INDAFRI YAHYA — Portfolio JS
════════════════════════════════════════════════════ */

// ── Nav scroll state ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    bars[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
    bars[1].style.cssText = 'opacity:0';
    bars[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
});
// Close menu on link click
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => b.style.cssText = '');
  });
});

// ── Active nav highlight ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ── Scroll reveal (AOS) ──────────────────────────
const aosItems = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
aosItems.forEach(el => aosObserver.observe(el));

// ── Animate skill bars on scroll ─────────────────
const skillBars = document.querySelectorAll('.skill-bar__fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.getPropertyValue('--w') || '0%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => {
  bar.style.width = '0%';
  barObserver.observe(bar);
});

// ── Smooth scroll for anchors ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Subtle cursor glow on hero ───────────────────
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    hero.style.setProperty('--mx', `${x}%`);
    hero.style.setProperty('--my', `${y}%`);
  });
}

// ── Typing effect for hero role ──────────────────
const roles = [
  'UI/UX Designer',
  'Front-End Developer',
  'Interaction Designer',
  'AI Enthusiast',
];
const roleEl = document.querySelector('.hero__role');
if (roleEl) {
  let ri = 0, ci = 0, deleting = false;
  const type = () => {
    const current = roles[ri];
    if (!deleting) {
      roleEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      roleEl.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  };
  setTimeout(type, 1000);
}

// ── Page load animation ──────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity .4s ease';
    document.body.style.opacity = '1';
  });
});

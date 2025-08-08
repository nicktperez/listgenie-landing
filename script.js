// Mobile nav drawer
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    drawer.hidden = open;
  });
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { drawer.hidden = true; burger.setAttribute('aria-expanded','false'); })
  );
}

// Smooth scroll for same‑page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Testimonials carousel
(function testimonials(){
  const wrap = document.getElementById('carousel');
  const dotsWrap = document.getElementById('dots');
  if (!wrap || !dotsWrap) return;
  const slides = Array.from(wrap.querySelectorAll('.tcard'));
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Show testimonial ${i+1}`);
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => show(i));
    dotsWrap.appendChild(b);
  });
  let current = 0;
  function show(i){
    slides[current].classList.remove('is-active');
    dotsWrap.children[current].classList.remove('is-active');
    current = i;
    slides[current].classList.add('is-active');
    dotsWrap.children[current].classList.add('is-active');
  }
  // auto-advance
  setInterval(() => show((current + 1) % slides.length), 5500);
})();

// Pricing toggle
const toggle = document.getElementById('planToggle');
if (toggle){
  const prices = document.querySelectorAll('.price > span');
  const update = () => {
    prices.forEach(el => {
      const v = toggle.checked ? el.dataset.year : el.dataset.month;
      el.textContent = `$${v}`;
    });
  };
  toggle.addEventListener('change', update);
  update();
}

// Waitlist form (local only for now)
const form = document.getElementById('waitlistForm');
if (form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const help = document.getElementById('formHelp');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      help.textContent = 'Please enter a valid email.';
      return;
    }
    try {
      // For now, store locally; swap to real endpoint later.
      const key = 'listgenie_waitlist';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      if (!existing.includes(email)) existing.push(email);
      localStorage.setItem(key, JSON.stringify(existing));
      help.textContent = 'Thanks! You’re on the list. ✨';
      form.reset();
    } catch {
      help.textContent = 'Saved. (If this persists, contact us.)';
    }
  });
}
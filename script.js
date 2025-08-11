function toggleMenu(){
  const el = document.getElementById('mobileMenu');
  el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
}
function closeMenu(){
  const el = document.getElementById('mobileMenu');
  el.style.display = 'none';
}
document.getElementById('y').textContent = new Date().getFullYear();

// Smooth scroll for same-page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const t = document.getElementById(id);
  if (t) {
    e.preventDefault();
    window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
    closeMenu();
  }
});

// Minimal click analytics (beacon). Replace `/collect` with your endpoint if needed.
function sendBeacon(eventName, meta = {}) {
  try {
    const url = '/collect'; // optional: implement in your host if you want to store events
    const body = JSON.stringify({ event: eventName, meta, ts: Date.now(), path: location.pathname });
    if (navigator.sendBeacon) navigator.sendBeacon(url, body);
    else fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
  } catch {}
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.track');
  if (!btn) return;
  const eventName = btn.getAttribute('data-event') || 'click';
  sendBeacon(eventName);
});

// If you use a GIF/MP4 in hero, nothing else needed. Keep only one of <img> or <video> in index.html.
// ─── CAROUSEL DATA ───────────────────────────────────────
const shows = [
  { title: "Inferno Protocol",   genre: "Sci-Fi Thriller", year: "2025", rating: "9.1", badge: "4K",  img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80" },
  { title: "La Liga Live",       genre: "Sports · Live",   year: "HD",   rating: "●",   badge: "LIVE", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80" },
  { title: "Neon Dynasties",     genre: "Drama Series",    year: "2024", rating: "8.7", badge: "NEW",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80" },
  { title: "Desert Storm",       genre: "Action",          year: "2025", rating: "8.4", badge: "4K",  img: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80" },
  { title: "CNN World News",     genre: "News · Live",     year: "HD",   rating: "●",   badge: "LIVE", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" },
  { title: "Phantom Code",       genre: "Tech Thriller",   year: "2025", rating: "9.0", badge: "HDR",  img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
  { title: "Champions League",   genre: "Football · Live", year: "4K",   rating: "●",   badge: "LIVE", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80" },
  { title: "The Last Horizon",   genre: "Sci-Fi Epic",     year: "2024", rating: "9.3", badge: "4K",  img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80" },
];

const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const cardWidth = 280 + 24;
let current = 0;
const visible = 4;
const maxSlide = shows.length - visible;

shows.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'carousel-card';
  const badgeStyle = s.badge === 'LIVE'
    ? 'background:#E5173A;animation:livePulse 1s ease-in-out infinite alternate;'
    : s.badge === 'NEW'
    ? 'background:#22C55E;color:#fff;'
    : 'background:#F5C518;color:#000;';
  card.innerHTML = `
    <div class="card-thumb" style="position:relative;overflow:hidden;">
      <img src="${s.img}" alt="${s.title}"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;"
        onerror="this.style.display='none'">
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(8,10,15,0.85) 100%);z-index:1;"></div>
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.25);z-index:1;transition:opacity 0.3s;"></div>
      <div class="card-play" style="z-index:3;"><div class="arr"></div></div>
      <div class="card-badge" style="${badgeStyle}z-index:3;position:absolute;top:10px;left:10px;">${s.badge}</div>
      <div class="card-rating" style="z-index:3;position:absolute;top:10px;right:10px;">${s.rating === '●' ? '<span style="color:#E5173A">● LIVE</span>' : '⭐ '+s.rating}</div>
    </div>
    <div class="card-info">
      <div class="card-genre">${s.genre}</div>
      <div class="card-name">${s.title}</div>
      <div class="card-meta"><span>${s.year}</span><span style="color:#E5173A">▶ Watch Now</span></div>
    </div>`;
  // zoom image on hover
  card.addEventListener('mouseenter', () => { const img = card.querySelector('img'); if(img) img.style.transform='scale(1.08)'; });
  card.addEventListener('mouseleave', () => { const img = card.querySelector('img'); if(img) img.style.transform='scale(1)'; });
  track.appendChild(card);
});

// Dots
for (let i = 0; i <= maxSlide; i++) {
  const d = document.createElement('div');
  d.className = 'cdot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(d);
}

function goTo(idx) {
  current = Math.max(0, Math.min(idx, maxSlide));
  track.style.transform = `translateX(-${current * cardWidth}px)`;
  document.querySelectorAll('.cdot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

// Auto-advance
setInterval(() => goTo(current >= maxSlide ? 0 : current + 1), 4000);

// ─── TICKER ───────────────────────────────────────────────
const channels = [
  "ESPN • Live Sports", "CNN • World News", "BBC • International", "NFL Network",
  "Discovery Channel", "Fox Sports", "National Geographic", "HBO Max",
  "Sky Sports", "Eurosport", "MTV", "Cartoon Network", "Al Jazeera",
  "DAZN Sports", "TV5Monde", "RAI International", "TVE España",
  "France 24", "NHK World", "CBeebies", "E! Entertainment",
];
const ticker = document.getElementById('ticker');
const doubled = [...channels, ...channels];
doubled.forEach(ch => {
  const item = document.createElement('div');
  item.className = 'ticker-item';
  item.innerHTML = `<div class="ticker-dot"></div>${ch}`;
  ticker.appendChild(item);
});

// ─── SCROLL ANIMATIONS ────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── LIVE BADGE PULSE ─────────────────────────────────────
const style = document.createElement('style');
style.textContent = `@keyframes livePulse { from { opacity:1; } to { opacity:0.6; } }`;
document.head.appendChild(style);

// ─── BACK TO TOP BUTTON ────────────────────────────────
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.title = 'Back to top';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── NEWSLETTER FORM ───────────────────────────────────
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing! Check your email for confirmation.');
    newsletterForm.reset();
  });
}

// ─── FAQ ACCORDION ─────────────────────────────────
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

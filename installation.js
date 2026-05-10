// ─── TAB SWITCHING ─────────────────────────────────────
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');

    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// ─── INSTALL TAB SWITCHING (MOBILE) ────────────────────
const installTabButtons = document.querySelectorAll('.install-tab-btn');
const installTabContents = document.querySelectorAll('.install-tab-content');

installTabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-install-tab');

    // Remove active class from all buttons and contents
    installTabButtons.forEach(btn => btn.classList.remove('active'));
    installTabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// ─── SCROLL ANIMATIONS ────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

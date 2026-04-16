/* ============================================
   FAXX - Homepage JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initStatCounters();
});

/* ---------- Parallax on Hero ---------- */
function initParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero-orb');

  if (!hero || !orbs.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;

    if (scrollY < heroH) {
      orbs.forEach((orb, i) => {
        const speed = 0.15 + (i * 0.08);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
  }, { passive: true });
}

/* ---------- Stat Counters ---------- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10);
  const suffix = element.dataset.suffix || '';
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (current >= 1000) {
      element.textContent = (current / 1000).toFixed(1) + 'K' + suffix;
    } else {
      element.textContent = current + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (target >= 1000) {
        element.textContent = (target / 1000).toFixed(1) + 'K' + suffix;
      } else {
        element.textContent = target + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

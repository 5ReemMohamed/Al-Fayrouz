document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    offset: 100,
  });

  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', function () {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.add('loaded');
      triggerEntranceAnimations();
    }, 1000);
  });


  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  function nextSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }
  setInterval(nextSlide, 5000);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = target.offsetTop - 100; 
        window.scrollTo({ top: offset, behavior: 'smooth' });

        const collapse = document.querySelector('.navbar-collapse');
        if (collapse?.classList.contains('show')) {
          new bootstrap.Collapse(collapse).hide();
        }
      }
    });
  });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('service-card')) animateServiceCard(entry.target);
        if (entry.target.classList.contains('testimonial-card')) animateTestimonialCard(entry.target);
        if (entry.target.classList.contains('location-card')) animateLocationCard(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .testimonial-card, .location-card, .feature-item, .gallery-item, .why-card')
    .forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

  function animateServiceCard(card) {
    const icon = card.querySelector('.service-icon');
    const features = card.querySelectorAll('.feature-tag');
    setTimeout(() => (icon.style.animation = 'bounceIn 0.8s ease-out'), 200);
    features.forEach((feature, i) => {
      setTimeout(() => {
        feature.style.animation = 'fadeInUp 0.5s ease-out forwards';
        feature.style.opacity = '1';
      }, 400 + i * 100);
    });
  }

  function animateTestimonialCard(card) {
    card.querySelectorAll('.bi-star-fill').forEach((star, i) => {
      setTimeout(() => {
        star.style.animation = 'zoomIn 0.3s ease-out';
        star.style.color = '#f59e0b';
      }, i * 100);
    });
  }

  function animateLocationCard(card) {
    const icon = card.querySelector('i');
    const text = card.querySelector('span');
    setTimeout(() => (icon.style.animation = 'bounceIn 0.6s ease-out'), 100);
    setTimeout(() => (text.style.animation = 'fadeInUp 0.5s ease-out'), 300);
  }

 
  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + (target < 100 ? '+' : '');
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target));
        counterObserver.unobserve(entry.target);
      }
    });
  });
  counters.forEach(counter => counterObserver.observe(counter));

  
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

 
  function triggerEntranceAnimations() {
    document.querySelectorAll('[data-aos]').forEach((el, i) => {
      setTimeout(() => el.classList.add('aos-animate'), i * 100);
    });
  }

 
  window.addEventListener('error', e => {
    console.log('Error caught: ', e.error);
  });

 
  function updateScrollProgress() {
    const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', percent + '%');
    const bar = document.querySelector('.scroll-progress-bar');
    if (bar) bar.style.width = percent + '%';
  }
  window.addEventListener('scroll', debounce(updateScrollProgress, 10));

  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));
  }

 
  const images = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        imgObserver.unobserve(img);
        img.addEventListener('load', () => (img.style.animation = 'fadeIn 0.5s ease-out'));
      }
    });
  });
  images.forEach(img => imgObserver.observe(img));


  console.log('🚚 Al-Fayrouz script loaded');
});

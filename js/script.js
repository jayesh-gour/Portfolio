// ==========================================================================
// Navbar scroll state
// ==========================================================================
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 24) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ==========================================================================
// Mobile menu toggle
// ==========================================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ==========================================================================
// Scroll reveal
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal, .reveal-group');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// ==========================================================================
// Active nav link (based on current path)
// ==========================================================================
(function setActiveNav() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    if (target === path || (target !== '/' && path.endsWith(target))) {
      link.classList.add('active');
    }
  });
})();

// ==========================================================================
// Contact form validation + submission
// Uses Formspree (https://formspree.io) — replace YOUR_FORM_ID in contact.html
// with your own endpoint. No submission is faked; until that's set up the
// form will show a clear message instead of pretending to send.
// ==========================================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusBox = document.getElementById('form-status');

  const showError = (field, message) => {
    const errorEl = document.querySelector(`[data-error-for="${field}"]`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  };

  const clearErrors = () => {
    document.querySelectorAll('.field-error').forEach((el) => {
      el.textContent = '';
      el.classList.remove('show');
    });
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    statusBox.classList.remove('show', 'success', 'error');

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    let valid = true;
    if (!name) { showError('name', 'Please enter your name.'); valid = false; }
    if (!email || !isValidEmail(email)) { showError('email', 'Please enter a valid email.'); valid = false; }
    if (!subject) { showError('subject', 'Please add a subject.'); valid = false; }
    if (!message || message.length < 10) { showError('message', 'Message should be at least 10 characters.'); valid = false; }

    if (!valid) return;

    const action = contactForm.getAttribute('action') || '';
    if (action.includes('YOUR_FORM_ID')) {
      statusBox.textContent = 'Form isn\u2019t connected yet \u2014 add your Formspree endpoint in contact.html to enable sending. Meanwhile, feel free to email directly.';
      statusBox.classList.add('show', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });

      if (res.ok) {
        statusBox.textContent = 'Message sent \u2014 thanks for reaching out, I\u2019ll reply soon.';
        statusBox.classList.add('show', 'success');
        contactForm.reset();
      } else {
        statusBox.textContent = 'Something went wrong sending that. Try emailing directly instead.';
        statusBox.classList.add('show', 'error');
      }
    } catch (err) {
      statusBox.textContent = 'Network error \u2014 please try again or email directly.';
      statusBox.classList.add('show', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

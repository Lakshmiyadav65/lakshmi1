/* ==========================================
   PREMIUM PORTFOLIO INTERACTIVITY
   Marcus Vance - Senior Product Designer
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlow();
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initActiveNavLinkObserver();
  initModals();
  initContactForm();
});

/* --- 1. Ambient Glow Positioning --- */
function initAmbientGlow() {
  const glowCursor = document.getElementById('glow-cursor');
  if (!glowCursor) return;

  document.addEventListener('mousemove', (e) => {
    // Position the glow cursor relative to the viewport
    glowCursor.style.left = `${e.clientX}px`;
    glowCursor.style.top = `${e.clientY}px`;
  });
}

/* --- 2. Sticky Header --- */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- 3. Mobile Menu Toggle --- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link, .btn-contact-nav');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* --- 4. Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // Animate skill bars when they enter viewport
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = level;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

/* --- 5. Active Nav Link on Scroll --- */
function initActiveNavLinkObserver() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-20% 0px -40% 0px'
  });

  sections.forEach(section => {
    activeObserver.observe(section);
  });
}

/* --- 6. Case Study Modals --- */
const caseStudies = {
  vibecoderz: {
    title: 'VibecoderZ — Intent-First Learning Platform',
    category: 'Product Project / Full-Stack',
    client: 'VibecoderZ Team',
    role: 'Lead Full Stack Developer',
    timeline: '3 Months (2024)',
    image: 'grad-project-1',
    overview: 'VibecoderZ is a next-generation education platform that delivers dynamic, personalized software engineering learning paths adjusted in real-time according to user intent and engagement.',
    challenge: 'Typical coding platforms enforce rigid, linear curriculum paths. Users frequently lose interest due to mismatched pacing, dry information architectures, and generic programming exercises.',
    solution: 'Designed and implemented full-stack recommendation nodes that extract user intention from search queries and progress benchmarks. Created dynamic frontend templates that rearrange layouts, highlight relevant guides, and custom-tailor instructions.',
    impact: 'Increased student lesson completion rates by 28% and successfully accommodated 15+ complex user intent patterns.'
  },
  restaurant: {
    title: 'Restaurant Management Platform',
    category: 'Matrimony Training / Frontend',
    client: 'Matrimony Training Division',
    role: 'Frontend UI/UX Developer',
    timeline: '48-Hour Sprint (2024)',
    image: 'grad-project-2',
    overview: 'A high-performance management dashboard built for restaurant operators to coordinate seat reservations, menu lists, and daily operation pipelines.',
    challenge: 'Operators need to quickly assess table occupancies and update booking data. The dashboard had to be fully responsive and load within seconds under high traffic, all implemented within a tight deadline.',
    solution: 'Designed user-centric reservation workflow diagrams and dashboard interfaces. Implemented a fully responsive CSS grid system and fluid interactive table selectors, ensuring mobile accessibility.',
    impact: 'Delivered key functional frontend layout structures within a rapid 48-hour sprint, enabling booking nodes to handle 1,200+ mock monthly seat allocations.'
  }
};

function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close');
  const workCards = document.querySelectorAll('.work-card');

  if (!modalOverlay || !modalContainer || !modalClose) return;

  function openModal(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    // Populate Modal Content
    const heroBanner = modalContainer.querySelector('#modal-hero-banner');
    const heroImg = modalContainer.querySelector('#modal-hero-img');
    
    if (data.image && !data.image.startsWith('grad-')) {
      heroImg.src = data.image;
      heroImg.alt = data.title;
      heroImg.style.display = 'block';
      if (heroBanner) heroBanner.style.display = 'none';
    } else {
      heroImg.style.display = 'none';
      if (heroBanner) {
        heroBanner.style.display = 'block';
        heroBanner.className = `modal-hero-banner ${data.image || 'grad-project-1'}`;
      }
    }

    modalContainer.querySelector('.modal-category').textContent = data.category;
    modalContainer.querySelector('.modal-title').textContent = data.title;
    
    // Meta items
    const metaHeaders = modalContainer.querySelectorAll('.modal-meta-item h5');
    metaHeaders[0].textContent = data.client;
    metaHeaders[1].textContent = data.role;
    metaHeaders[2].textContent = data.timeline;

    // Body segments
    const bodyContainer = modalContainer.querySelector('.modal-body');
    bodyContainer.innerHTML = `
      <h4>Project Overview</h4>
      <p>${data.overview}</p>
      
      <h4>The Challenge</h4>
      <p>${data.challenge}</p>
      
      <h4>Our Solution</h4>
      <p>${data.solution}</p>
      
      <h4>The Impact</h4>
      <p>${data.impact}</p>
    `;

    // Open animations
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
  }

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openModal(projectId);
    });
  });

  modalClose.addEventListener('click', closeModal);
  
  // Close on backdrop click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --- 7. Contact Form Handling & Validation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');
  const submitText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.spinner');
  const formStatus = document.getElementById('form-status');

  const inputs = form.querySelectorAll('input, textarea');

  // Input helper to clear error when typing
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('error')) {
        group.classList.remove('error');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';

    let hasErrors = false;

    // Validate fields
    inputs.forEach(input => {
      const group = input.closest('.form-group');
      const val = input.value.trim();

      if (!val) {
        group.classList.add('error');
        hasErrors = true;
      } else if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          group.classList.add('error');
          const errorMsg = group.querySelector('.form-error-msg');
          if (errorMsg) errorMsg.textContent = 'Please enter a valid email address.';
          hasErrors = true;
        }
      }
    });

    if (hasErrors) {
      // Trigger subtle shake animation on the form container
      const container = form.closest('.contact-form-container');
      container.style.animation = 'shake 0.4s ease';
      setTimeout(() => {
        container.style.animation = '';
      }, 400);
      return;
    }

    // Submit state: loading
    submitBtn.disabled = true;
    spinner.style.display = 'block';
    submitText.style.display = 'none';

    // Simulate API Post request
    setTimeout(() => {
      // Clear inputs
      inputs.forEach(input => {
        input.value = '';
        input.closest('.form-group').classList.remove('error');
      });

      // Show success
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      submitText.style.display = 'block';

      formStatus.classList.add('success');
      formStatus.textContent = 'Message sent successfully! Marcus will get back to you shortly.';
      formStatus.style.display = 'block';

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.opacity = '0';
        formStatus.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          formStatus.style.display = 'none';
          formStatus.style.opacity = '1';
        }, 500);
      }, 5000);

    }, 1800);
  });
}

// Add Shake animation to document stylesheets dynamically for the error visual feedback
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
`;
document.head.appendChild(styleSheet);

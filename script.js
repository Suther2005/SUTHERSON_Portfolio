/* ============================================================
   SUTHERSONR PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== LOADER ===== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      animateSkillBars();
      animateEduBars();
    }, 2000);
  });
  document.body.style.overflow = 'hidden';


  /* ===== CUSTOM CURSOR ===== */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX; dotY = e.clientY;
    dot.style.left  = dotX + 'px';
    dot.style.top   = dotY + 'px';
  });

  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, .skill-card, .cert-card, .project-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });


  /* ===== AOS INIT ===== */
  AOS.init({
    duration: 700,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });


  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky style
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active nav link
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) currentSection = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });


  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ===== THEME TOGGLE ===== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const htmlEl      = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }


  /* ===== TYPING EFFECT ===== */
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'CSE Student',
    'Java Developer',
    'Problem Solver',
    'Machine Learning Enthusiast',
    'Full-Stack Developer',
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 1200);


  /* ===== SKILLS FILTER ===== */
  const catBtns   = document.querySelectorAll('.skill-cat-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      skillCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ===== SKILL BARS ANIMATION ===== */
  function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const target = fill.getAttribute('data-width');
      fill.style.width = target + '%';
    });
  }

  /* Animate on scroll into view (fallback) */
  const skillsSection = document.getElementById('skills');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateSkillBars();
    });
  }, { threshold: 0.3 });
  if (skillsSection) skillObserver.observe(skillsSection);


  /* ===== EDUCATION PROGRESS BARS ===== */
  function animateEduBars() {
    document.querySelectorAll('.edu-progress-fill').forEach(fill => {
      const target = fill.getAttribute('data-width');
      fill.style.width = target + '%';
    });
  }
  const eduSection = document.getElementById('education');
  const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateEduBars();
    });
  }, { threshold: 0.2 });
  if (eduSection) eduObserver.observe(eduSection);


  /* ===== CERTIFICATE MODAL ===== */
  const certData = {
    cert1: { icon: '<i class="fab fa-java"></i>', title: 'Core Java Programming', platform: 'Coursera - Learn Quest', year: '2024', image: 'assets/core java .jpeg' },
    cert2: { icon: '<i class="fas fa-brain"></i>', title: 'Introduction to Artificial Intelligence', platform: 'Coursera - IBM', year: '2025', image: 'assets/Intro (AI).jpeg' },
    cert3: { icon: '<i class="fab fa-react"></i>', title: 'OCI Foundation Associate', platform: 'Oracle', year: '2025', image: 'assets/OCI.jpeg' },
    cert4: { icon: '<i class="fas fa-database"></i>', title: 'Power Bi Data Analyst Associate (PL-300)', platform: 'Microsoft', year: '2026', image: 'assets/PL-300.jpeg' },
    cert5: { icon: '<i class="fas fa-code-branch"></i>', title: 'Data Analytics with Python', platform: 'NPTEL', year: '2025', image: 'assets/NPTEL - DA.jpeg' },
    cert6: { icon: '<i class="fas fa-network-wired"></i>', title: 'Cloud Computing', platform: 'NPTEL', year: '2025', image: 'assets/NPTEL - CC.jpeg' },
    cert7: { icon: '<i class="fas fa-robot"></i>', title: 'AI Intern', platform: 'Internship Certificate', year: '2025', image: 'assets/AI intern.jpeg' },
    cert8: { icon: '<i class="fas fa-industry"></i>', title: 'Celonis Process Mining', platform: 'Celonis', year: '2025', image: 'assets/celoni Process Mining.jpeg' },
    cert9: { icon: '<i class="fas fa-briefcase"></i>', title: 'GWC Internship Completion', platform: 'GWC Data.Ai', year: '2025', image: 'assets/GWC Internship completion.jpeg' },
  };
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');
  const modalIcon = document.getElementById('modalIcon');

  window.openModal = function(id) {
    const data = certData[id];
    if (!data) return;
    if (data.image) {
      modalImage.src = data.image;
      modalImage.style.display = 'block';
      modalIcon.style.display = 'none';
    } else {
      modalImage.removeAttribute('src');
      modalImage.style.display = 'none';
      modalIcon.style.display = 'block';
    }
    modalIcon.innerHTML = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalPlatform').textContent = data.platform;
    document.getElementById('modalYear').textContent  = data.year;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  /* ===== CONTACT FORM VALIDATION ===== */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  function validateField(id, errorId, rule, msg) {
    const field = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!rule(field.value.trim())) {
      field.classList.add('error');
      error.textContent = msg;
      return false;
    } else {
      field.classList.remove('error');
      error.textContent = '';
      return true;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameOk    = validateField('name', 'nameError',
      v => v.length >= 2, 'Please enter your full name.');
    const emailOk   = validateField('email', 'emailError',
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.');
    const msgOk     = validateField('message', 'messageError',
      v => v.length >= 10, 'Message must be at least 10 characters.');

    if (!nameOk || !emailOk || !msgOk) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subjectInput = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = subjectInput || `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailTo = `mailto:rsutherson800@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailTo;

    form.reset();
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  });

  // Real-time validation clearing
  ['name', 'email', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errEl = document.getElementById(id + 'Error');
      if (errEl) errEl.textContent = '';
    });
  });


  /* ===== SMOOTH SCROLL FOR ANCHORS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ===== PARALLAX ON HERO BLOBS ===== */
  const blobs = document.querySelectorAll('.blob');
  document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 12;
      blob.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
    });
  });


  /* ===== NUMBER COUNTER ANIMATION ===== */
  function animateCounter(el, target) {
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.round(current) + (el.dataset.suffix || '+');
    }, 40);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(num => {
          const val = parseInt(num.textContent);
          num.dataset.suffix = num.textContent.replace(/[0-9]/g, '');
          animateCounter(num, val);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) statObserver.observe(aboutSection);


  /* ===== BACK TO TOP VISIBILITY ===== */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
      backToTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    }
  });

});

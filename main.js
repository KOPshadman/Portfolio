// ─── Typing effect ───
const roles = [
  'Software Engineer',
  'Problem Solver',
  'Java Developer',
  'Web Developer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 55 : 90);
}

type();

// ─── DOM references ───
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// ─── Active nav link on scroll ───
function highlightNavLink() {
  let current = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ─── Navbar scroll state ───
function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNavLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Mobile nav toggle ───
const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

navLinksList.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinksList.classList.remove('open');
});

// ─── Reveal on scroll (IntersectionObserver) ───
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ─── Skill bars animate on reveal ───
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

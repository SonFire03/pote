const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const toTopButton = document.getElementById('to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const revealElements = document.querySelectorAll('.reveal');
const typewriterElement = document.querySelector('.typewriter');
const flipCard = document.querySelector('.flip-card');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

if (typewriterElement) {
  const text = typewriterElement.getAttribute('data-text') || '';
  let index = 0;

  const type = () => {
    if (index <= text.length) {
      typewriterElement.textContent = text.slice(0, index);
      index += 1;
      setTimeout(type, 42);
    }
  };

  type();
}

if (filterButtons.length > 0 && galleryItems.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      galleryItems.forEach((item) => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
}

if (flipCard) {
  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
  });

  flipCard.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipCard.classList.toggle('flipped');
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    toTopButton.classList.add('show');
  } else {
    toTopButton.classList.remove('show');
  }
});

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Merci. Ce formulaire est une démo front-end.');
    contactForm.reset();
  });
}

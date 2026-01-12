// Smooth scroll and active nav link highlighting
document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation link clicks
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Update active nav link on scroll
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const navHeight = 80;
    let currentSection = '';

    // If we're at the very top, highlight home
    if (scrollY < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#home' || href === '#') {
          link.classList.add('active');
        }
      });
      return;
    }

    // Check each section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    // Update active link
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (currentSection && href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial check - ensure home is active at page load
  window.scrollTo(0, 0);
  setTimeout(() => {
    updateActiveNavLink();
  }, 100);

  // Animated gradient blobs that move on scroll
  const blobs = document.querySelectorAll('.gradient-blob');
  if (blobs.length > 0) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      
      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        const currentTransform = blob.style.transform || 'translate(0, 0)';
        const matches = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
        
        if (matches) {
          const currentX = parseFloat(matches[1]) || 0;
          const currentY = parseFloat(matches[2]) || 0;
          
          // Move blobs based on scroll direction
          const newX = currentX + (Math.random() - 0.5) * scrollDelta * 0.1 * speed;
          const newY = currentY + scrollDelta * 0.2 * speed;
          
          blob.style.transform = `translate(${newX}px, ${newY}px)`;
        }
      });
      
      lastScrollY = scrollY;
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple form validation
      if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес.');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Project preview cards - navigate to projects page with project index
  const projectPreviewCards = document.querySelectorAll('.project-preview-card');
  projectPreviewCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const projectIndex = this.getAttribute('data-project-index');
      if (projectIndex !== null) {
        // Store the project index in sessionStorage
        sessionStorage.setItem('selectedProjectIndex', projectIndex);
        // Navigate to projects page
        window.location.href = 'projects.html';
      }
    });
  });
});

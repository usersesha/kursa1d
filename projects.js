// Projects data with images and descriptions
const projects = [
  {
    id: 'SoftSkill Quest',
    name: 'SoftSkill Quest',
    tagline: 'Платформа для развития soft skills',
    year: 2025,
    description: 'Интерактивная веб-платформа для развития soft skills с модульной системой обучения. Проект включает современный дизайн, интуитивный интерфейс и систему отслеживания прогресса. Платформа помогает пользователям развивать коммуникативные навыки, критическое мышление и другие важные компетенции.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    images: [
      '/imges/01.png',
      '/imges/02.png',
      '/imges/03.png',
      '/imges/04.png',
      '/imges/05.png'
    ],
    video: null
  },
  {
    id: 'circus',
    name: 'Circus',
    tagline: 'Веб-сайт для промоутинга цирка',
    year: 2019,
    description: 'Веб-сайт представляет собой учебный проект, разработанный в рамках экзаменационного задания по дисциплине, связанной с основами веб-разработки. <br>Тематика проекта была задана заранее, а весь цикл разработки — от получения задания до сдачи готового результата — был выполнен в ограниченный временной промежуток, составлявший пять часов.',
    tech: ['Figma', 'CSS3', 'HTML5', 'Visio'],
    images: [
      '188650817-b5cff38c-9f74-4fc6-acb3-ce82ac750da9.png',
      '188650839-79455303-182e-45ad-9e1d-466c5f8c1df4.png',
      '188651738-39761dec-9b6b-41ae-8f6f-b78188291771.png',
      '188651755-3a305277-7fa4-48f6-8aa4-cc84504a7001.png',
      '188652222-a7703bd0-3027-42ca-9561-a04397fbb1b6.png',
      '188653127-3eebc59e-b3b4-4655-ba8e-8312bf865dfd.png'
    ],
    video: null
  },
  {
    id: 'culture',
    name: 'Культура_цветения',
    tagline: 'Веб-приложение для продажи и продвижения услуг по уходу за растениями',
    year: 2025,
    description: 'Проект представляет собой концепт корпоративного сайта для компании, занимающейся озеленением интерьеров и профессиональным уходом за домашними и офисными растениями. <br>В рамках работы была продумана структура сайта, пользовательские сценарии, логика взаимодействия с услугами и визуальная концепция, ориентированная на формирование доверия и демонстрацию экспертизы компании.',
    tech: ['HTML5', 'JavaScript', 'CSS3', 'Bootstrap', 'Figma'],
    images: [
      'imges/Главная.png',
      'imges/О нас.png',
      'imges/Портфолио.png',
      'imges/Услуги.png',
      'imges/Контакты.png'
    ],
    video: null
  },
  {
    id: 'dobroed',
    name: 'Доброед',
    tagline: 'Концепт платформы для благотворительного фудшеринга',
    year: 2025,
    description: 'Веб-платформа для пользователей, которые хотят делиться едой и поддерживать благотворительные инициативы. Проект помогает быстро находить доступную еду и отслеживать, кому нужна помощь, делая процесс прозрачным и удобным.',
    tech: ['Photoshop', 'Illustrator', 'UI/UX Design', 'Figma'],
    images: [
      '11.png',
      '12.png',
      '13.png',
      '14.png',
      '15.png'
    ],
    video: null
  },
  {
    id: 'profi',
    name: 'Курсы профи',
    tagline: 'Платформа для продвижения, продажи и предоставления обучающих курсов',
    year: 2025,
    description: 'Веб-платформа, которая помогает пользователям находить и проходить практические микрокурсы с сопровождением менторов. Проект демонстрирует структуру курсов, пользовательские сценарии и интерфейс оформления услуг, делая процесс обучения прозрачным и удобным.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Adobe Animate'],
    images: [
      'imges/1.png',
      'imges/2.png',
      'imges/3.png',
      'imges/4.png'
    ],
    video: null
  }
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

// Initialize projects page
document.addEventListener('DOMContentLoaded', function() {
  // Check if a specific project index was passed from the main page
  const selectedProjectIndex = sessionStorage.getItem('selectedProjectIndex');
  const initialProjectIndex = selectedProjectIndex !== null ? parseInt(selectedProjectIndex) : 0;
  
  // Clear the stored index after using it
  sessionStorage.removeItem('selectedProjectIndex');
  
  // Start with the selected project or default to softskills (index 0)
  loadProject(initialProjectIndex);
  currentProjectIndex = initialProjectIndex;
  
  // Navigation buttons
  document.getElementById('prevBtn').addEventListener('click', function(e) {
    e.preventDefault();
    navigateProject(-1);
  });
  
  document.getElementById('nextBtn').addEventListener('click', function(e) {
    e.preventDefault();
    navigateProject(1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      navigateProject(-1);
    } else if (e.key === 'ArrowRight') {
      navigateProject(1);
    }
  });

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
});

function navigateProject(direction) {
  currentProjectIndex += direction;
  
  if (currentProjectIndex < 0) {
    currentProjectIndex = projects.length - 1;
  } else if (currentProjectIndex >= projects.length) {
    currentProjectIndex = 0;
  }
  
  currentImageIndex = 0;
  loadProject(currentProjectIndex);
}

function loadProject(index) {
  const project = projects[index];
  const container = document.getElementById('projectContainer');
  
  // Main gallery slide with clickable image for Fancybox
  // All images in the gallery are linked to Fancybox
  const allImagesForFancybox = project.images.map((img, idx) => 
    `<a href="${img}" data-fancybox="gallery-${index}" data-caption="${project.name} - Изображение ${idx + 1}" style="display: none;"></a>`
  ).join('');
  
  const mainGalleryHTML = project.images.map((img, idx) => `
    <div class="gallery-slide ${idx === 0 ? 'active' : ''}">
      <a href="${img}" data-fancybox="gallery-${index}" data-caption="${project.name} - Изображение ${idx + 1}">
        <img src="${img}" alt="${project.name} - Screenshot ${idx + 1}">
      </a>
    </div>
  `).join('');
  
  // Thumbnails HTML
  const thumbnailsHTML = project.images.map((img, idx) => `
    <div class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <img src="${img}" alt="Thumbnail ${idx + 1}">
    </div>
  `).join('');
  
  // Video HTML if exists
  let videoHTML = '';
  if (project.video) {
    videoHTML = `
      <div class="project-video">
        <video controls>
          <source src="${project.video}" type="video/mp4">
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    `;
  }
  
  // Create dots HTML
  const dotsHTML = project.images.map((_, idx) => `
    <div class="gallery-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
  `).join('');
  
  // Create tech tags HTML
  const techHTML = project.tech.map(tech => `
    <span class="tech-tag">${tech}</span>
  `).join('');
  
  container.innerHTML = `
    <div class="project-header">
      <div class="project-title-row">
        <h1 class="project-name">${project.name}</h1>
        <span class="project-year">${project.year}</span>
      </div>
      <p class="project-tagline">${project.tagline}</p>
    </div>
    
    <div class="project-gallery">
      <div class="gallery-slides" id="gallerySlides">
        ${mainGalleryHTML}
      </div>
      ${allImagesForFancybox}
      ${videoHTML}
      <div class="gallery-thumbnails" id="galleryThumbnails">
        ${thumbnailsHTML}
      </div>
      <div class="gallery-controls">
        ${dotsHTML}
      </div>
    </div>
    
    <div class="project-description-section">
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${techHTML}
      </div>
    </div>
  `;
  
  // Setup gallery navigation
  setupGallery();
  
  // Initialize Fancybox after content is loaded
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox]', {
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      }
    });
  }
}

function setupGallery() {
  const dots = document.querySelectorAll('.gallery-dot');
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbnails = document.querySelectorAll('.gallery-thumbnail');
  const slidesContainer = document.getElementById('gallerySlides');
  
  // Reset current image index when switching projects
  currentImageIndex = 0;
  
  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentImageIndex = index;
      updateGallery();
    });
  });
  
  // Thumbnails navigation
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      currentImageIndex = index;
      updateGallery();
    });
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (slidesContainer) {
    slidesContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    slidesContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next image
      const slides = document.querySelectorAll('.gallery-slide');
      currentImageIndex = (currentImageIndex + 1) % slides.length;
      updateGallery();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - previous image
      const slides = document.querySelectorAll('.gallery-slide');
      currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
      updateGallery();
    }
  }
}

function updateGallery() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const thumbnails = document.querySelectorAll('.gallery-thumbnail');
  const slidesContainer = document.getElementById('gallerySlides');
  
  if (slidesContainer && slides.length > 0) {
    slidesContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentImageIndex);
    });
    
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentImageIndex);
    });
    
    thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === currentImageIndex);
    });
  }
}

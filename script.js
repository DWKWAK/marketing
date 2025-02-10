// 이메일 폼 제출 (요소 존재 여부 체크)
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var formMessage = document.getElementById('formMessage');

    // 간단한 이메일 유효성 검사
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = "유효한 이메일 주소를 입력해 주세요.";
      formMessage.style.color = "red";
      return;
    }
    formMessage.textContent = "문의가 제출되었습니다. 빠른 시일 내에 연락드리겠습니다.";
    formMessage.style.color = "green";
    contactForm.reset();
  });
}

// 스크롤 애니메이션 (화면 내 요소가 보이면 animate__fadeInUp 추가)
document.addEventListener('DOMContentLoaded', function() {
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      if (elementPosition < screenPosition) {
        if (!element.classList.contains('animate__fadeInUp')) {
          element.classList.add('animate__fadeInUp');
        }
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
});

// 숫자 카운트업 애니메이션
function animateNumber(element, start, end, duration) {
  let current = start;
  const range = end - start;
  function easeOutQuad(t) { return t * (2 - t); }
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;
    if (progress < 1) {
      current = start + range * easeOutQuad(progress);
      element.textContent = Math.round(current);
      requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };
  requestAnimationFrame(step);
}

function startCountAnimation() {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const value = parseInt(stat.dataset.target);
    stat.textContent = '0';
    animateNumber(stat, 0, value, 2000);
  });
}

// 페이지 로드 후 카운트업 시작
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => { startCountAnimation(); }, 1000);
});

// Intersection Observer로 통계 섹션 감시
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCountAnimation();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.header-stats').forEach(stats => {
  observer.observe(stats);
});

// 그래프 애니메이션
function initializeGraph() {
  const bars = document.querySelectorAll('.graph-bar');
  const maxValue = Math.max(...Array.from(bars).map(bar => parseInt(bar.dataset.value)));

  bars.forEach((bar, index) => {
    const value = parseInt(bar.dataset.value);
    const height = (value / maxValue) * 100;
    bar.style.setProperty('--height', `${height}%`);
    
    // 지연 애니메이션 적용
    setTimeout(() => {
      bar.classList.add('animate');
    }, index * 100);
  });
}

// Intersection Observer로 그래프 애니메이션 제어
const graphObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initializeGraph();
      graphObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const graphContainer = document.querySelector('.graph-container');
  if (graphContainer) {
    graphObserver.observe(graphContainer);
  }
});

// FAQ 토글 기능
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
    // 다른 FAQ 항목 닫기
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) item.classList.remove('active');
    });
  });
});

// 후기 슬라이더 기능
function initTestimonialsSlider() {
  const track = document.querySelector('.testimonials-track');
  const items = document.querySelectorAll('.testimonial-item');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  
  let currentIndex = 0;
  let itemWidth = items[0].offsetWidth + 30; // gap 포함
  
  function updateSliderButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= items.length - getVisibleItems();
  }
  
  function getVisibleItems() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) return 1;
    if (viewportWidth < 992) return 2;
    return 3;
  }
  
  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    updateSliderButtons();
  }
  
  function handleResize() {
    itemWidth = items[0].offsetWidth + 30;
    updateSlidePosition();
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlidePosition();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - getVisibleItems()) {
      currentIndex++;
      updateSlidePosition();
    }
  });
  
  window.addEventListener('resize', handleResize);
  updateSliderButtons();
}

// DOM이 로드된 후 슬라이더 초기화
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialsSlider();
});

// 모바일 메뉴 버튼 및 닫기 버튼 기능
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const closeMenuBtn = document.querySelector('.close-menu');
  const body = document.body;

  function toggleMenu() {
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    
    // 메뉴가 활성화될 때만 닫기 버튼 표시
    if (navLinks.classList.contains('active') && window.innerWidth <= 992) {
      closeMenuBtn.style.display = 'flex';
      closeMenuBtn.style.visibility = 'visible';
      closeMenuBtn.style.opacity = '1';
    } else {
      closeMenuBtn.style.display = 'none';
      closeMenuBtn.style.visibility = 'hidden';
      closeMenuBtn.style.opacity = '0';
    }
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    body.style.overflow = '';
    closeMenuBtn.style.display = 'none';
    closeMenuBtn.style.visibility = 'hidden';
    closeMenuBtn.style.opacity = '0';
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  // 메뉴 항목 클릭시 자동으로 닫기
  navLinks.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      closeMenu();
    }
  });

  // 화면 크기 변경시 메뉴 상태 초기화
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      closeMenu();
    }
  });
});

// the skills section - by antigravity
document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const details = item.querySelector('.details');
      
      if (details) {
        details.classList.toggle('hidden');
      }
    });
  });

// Table sorting functionality - by antigravity
  const sortYearBtn = document.getElementById('sort-year');
  const table = document.getElementById('academic-table');
  
  if (sortYearBtn && table) {
    const tbody = table.querySelector('tbody');
    let ascending = true;

    sortYearBtn.addEventListener('click', () => {
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const icon = sortYearBtn.querySelector('i');

      rows.sort((a, b) => {
        const yearA = parseInt(a.cells[2].textContent);
        const yearB = parseInt(b.cells[2].textContent);

        return ascending ? yearA - yearB : yearB - yearA;
      });
      
      rows.forEach(row => tbody.appendChild(row));
      ascending = !ascending;
    });
  }

  // Hobbies Read More / Read Less Toggle
  const hobbyItems = document.querySelectorAll('.hobby-item');

  hobbyItems.forEach((item) => {
    const btn = item.querySelector('.hobby-toggle-btn');
    const desc = item.querySelector('.hobby-desc');

    if (btn && desc) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleHobby(desc, btn);
      });

      item.addEventListener('click', () => {
        toggleHobby(desc, btn);
      });
    }
  });

  function toggleHobby(desc, btn) {
    const isExpanded = desc.classList.toggle('expanded');
    if (isExpanded) {
      btn.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up"></i>';
    } else {
      btn.innerHTML = 'Read More <i class="fa-solid fa-chevron-down"></i>';
    }
  }
});

// Dark theme toggle functionality - by antigravity
document.addEventListener('DOMContentLoaded', () => {
  const darkIconLi = document.getElementById('dark-icon');
  if (darkIconLi) {
    const darkBtn = darkIconLi.querySelector('button');
    if (darkBtn) {
      const setTheme = (theme) => {
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          darkBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i> light';
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
          darkBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i> dark';
          localStorage.setItem('theme', 'light');
        }
      };

      darkBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      });

      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }
});

// Image popup/lightbox functionality for activities section
document.addEventListener('DOMContentLoaded', () => {
  const activityImages = document.querySelectorAll('.card-img img');
  if (activityImages.length > 0) {
    // Create lightbox overlay dynamically
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close image popup');
    
    const lightboxImg = document.createElement('img');
    
    const caption = document.createElement('div');
    caption.className = 'image-lightbox-caption';
    
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(caption);
    document.body.appendChild(lightbox);
    
    activityImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        // Find caption description from neighboring sibling element
        const siblingContent = img.nextElementSibling;
        if (siblingContent) {
          const desc = siblingContent.querySelector('p');
          if (desc) {
            caption.textContent = desc.textContent;
          } else {
            caption.textContent = img.alt || '';
          }
        } else {
          caption.textContent = img.alt || '';
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent page background scrolling
      });
    });
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});

// Scroll to Top visibility toggle
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.querySelector('.top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
  }
});
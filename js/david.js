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

//dark toggle
      (function() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      })();
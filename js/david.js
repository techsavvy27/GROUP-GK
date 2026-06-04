// the skills section- antigravity ai
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

// Table sorting functionality
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
      // Toggle on button click
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleHobby(desc, btn);
      });

      // Also toggle on description or header click for better usability
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

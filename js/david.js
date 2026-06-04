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
});

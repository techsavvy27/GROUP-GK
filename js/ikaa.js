document.querySelectorAll('.skill-item').forEach(function (item) {
  item.addEventListener('click', function () {
    const details = this.querySelector('.skill-details');
    const arrow   = this.querySelector('.skill-arrow');
    const isOpen  = details.classList.contains('open');

    // Close every open skill first
    document.querySelectorAll('.skill-details.open').forEach(function (d) {
      d.classList.remove('open');
    });
    document.querySelectorAll('.skill-arrow.rotated').forEach(function (a) {
      a.classList.remove('rotated');
    });

    // Then open the clicked one (if it was closed)
    if (!isOpen) {
      details.classList.add('open');
      arrow.classList.add('rotated');
    }
  });
});
let sortAsc = true;

document.getElementById('sort-btn').addEventListener('click', function () {
  const tbody = document.querySelector('#edu-table tbody');
  const rows  = Array.from(tbody.querySelectorAll('tr'));

  rows.sort(function (a, b) {
    const yearA = parseInt(a.cells[2].textContent.trim()) || 0;
    const yearB = parseInt(b.cells[2].textContent.trim()) || 0;
    return sortAsc ? yearA - yearB : yearB - yearA;
  });

  rows.forEach(function (row) { tbody.appendChild(row); });

  sortAsc = !sortAsc;
  this.textContent = sortAsc ? '↑ Sort Ascending' : '↓ Sort Descending';
});


document.querySelectorAll('.hobby-item').forEach(function (item) {
  const longText = item.querySelector('.hobby-long');
  const btn      = item.querySelector('.read-more-btn');

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isExpanded = longText.classList.contains('expanded');
    longText.classList.toggle('expanded');
    btn.textContent = isExpanded ? 'Read More' : 'Read Less';
  });
});


const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.lightbox-trigger').forEach(function (img) {
  img.addEventListener('click', function () {
    openLightbox(this.src, this.alt);
  });
});

lightboxClose.addEventListener('click', closeLightbox);

// Close by clicking the dark backdrop (outside the image)
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) closeLightbox();
});

// Close with the Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});


const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');

// Apply saved preference on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');

  if (isDark) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

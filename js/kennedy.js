// skills.js
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("click", () => {
      const details = item.querySelector(".skill-details");
      if (details) {
        details.classList.toggle("show");
      }
    });
  });
});

// hobbies.js
document.addEventListener("DOMContentLoaded", () => {
  const hobbyItems = document.querySelectorAll(".hobby-item");

  hobbyItems.forEach((item) => {
    const btn = item.querySelector(".toggle-btn");
    const details = item.querySelector(".hobby-details");

    if (btn && details) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        details.classList.toggle("show");
        btn.textContent = details.classList.contains("show")
          ? "Read Less"
          : "Read More";
      });
    }
  });
});

/* TABLE AND ORDERING AND REORDERING ACCORDING TO YEARS */
// portfolio.js
document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("education-table");
  const sortBtn = document.getElementById("sort-btn");
  let ascending = true;

  if (table && sortBtn) {
    sortBtn.addEventListener("click", () => {
      const tbody = table.querySelector("tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.sort((a, b) => {
        // Splits by hyphen to handle custom date ranges like "2025-Present" or "2023-2025" cleanly
        const yearA = parseInt(a.cells[2].textContent.split("-")[0], 10);
        const yearB = parseInt(b.cells[2].textContent.split("-")[0], 10);
        return ascending ? yearA - yearB : yearB - yearA;
      });

      // Re-append sorted rows
      rows.forEach((row) => tbody.appendChild(row));

      // Toggle sort order
      ascending = !ascending;
      sortBtn.textContent = ascending ? "Sort by Year ↑" : "Sort by Year ↓";
    });
  }
});

// portfolio.js
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-images img");
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const closeBtn = document.querySelector(".close");

  if (lightbox && lightboxContent && closeBtn) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex"; // show overlay
        lightboxContent.src = img.src; // set clicked image
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none"; // hide overlay
    });

    // Close when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });

    // Close with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    });
  }
});

// portfolio.js
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    // Show button after scrolling 200px
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    });

    // Smooth scroll to top when clicked
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// darkmode toggle module
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  if (header) {
    // Create toggle button dynamically
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "modeToggle";
    toggleBtn.textContent = "☀️ Light Mode";
    toggleBtn.classList.add("toggle-btn");

    // Append to header
    header.appendChild(toggleBtn);

    // Default mode
    document.body.classList.add("dark-mode");

    // Toggle logic
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("light-mode")) {
        toggleBtn.textContent = "🌙 Dark Mode";
      } else {
        toggleBtn.textContent = "☀️ Light Mode";
      }
    });
  }
});

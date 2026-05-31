//DARK MODE / LIGHT MODE SWITCHER
//
const themeSwitch = document.getElementById("theme-switch");
let darkmode = localStorage.getItem("darkmode");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.removeItem("darkmode"); // Cleaner than string "null"
};

// Initial check
if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  // Re-fetch the latest value
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

//
//TABLE SORTING
//
let ascending = true;

function sortTable() {
  const tbody = document.getElementById("tableBody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const icon = document.getElementById("sortIcon");

  rows.sort((a, b) => {
    const yearA = parseInt(a.cells[2].textContent);
    const yearB = parseInt(b.cells[2].textContent);
    return ascending ? yearA - yearB : yearB - yearA;
  });

  // Update Icon UI
  icon.innerHTML = ascending ? "↑" : "↓";

  // Re-render rows
  rows.forEach((row) => tbody.appendChild(row));

  ascending = !ascending;
}

// SKILL DETAILS TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".skill-item");
  items.forEach((item) => {
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () => {
      const details = item.querySelector(".skill-item-details");
      if (!details) return;
      details.classList.toggle("visible");
      item.setAttribute("aria-expanded", details.classList.contains("visible"));
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
});

// HOBBY DESCRIPTION READ MORE/READ LESS TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".read-more-btn");
  buttons.forEach((btn) => {
    const description = btn.previousElementSibling;
    if (!description || !description.classList.contains("hobby-description"))
      return;

    // Initialize as collapsed
    description.classList.add("collapsed");
    btn.textContent = "Read More";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = description.classList.contains("expanded");

      if (isExpanded) {
        description.classList.remove("expanded");
        description.classList.add("collapsed");
        btn.textContent = "Read More";
      } else {
        description.classList.remove("collapsed");
        description.classList.add("expanded");
        btn.textContent = "Read Less";
      }
    });
  });
});

// GALLERY LIGHTBOX
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery_image");
  const overlay = document.getElementById("lightbox-overlay");
  const lightboxImage = document.querySelector(".lightbox-image");
  const caption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  function closeLightbox() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    caption.textContent = "";
  }

  images.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      caption.textContent =
        image.dataset.caption || image.alt || "Image preview";
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("active")) {
      closeLightbox();
    }
  });
});

// SCROLL TO TOP BUTTON
document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.querySelector(".top");
  const scrollThreshold = 200;

  // Hide button initially
  topBtn.style.display = "none";

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  // Smooth scroll to top on click
  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

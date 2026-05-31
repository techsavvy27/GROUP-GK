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

//This is the clock in the header
//
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    clockEl.textContent = timeString;
  }
}

//This is the typewriter homepage effect
//
const text = "Hello, This is Group GK";
const speed = 100;
let i = 0;

function typeWriter() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(() => {
      target.innerHTML = "";
      i = 0;
      typeWriter();
    }, 3500);
  }
}

//This is the scrolling effects in the team section
//
function initCardCarousel() {
  const container = document.getElementById("team-slider");
  const prevBtn = document.querySelector(".carousel-arrow.prev");
  const nextBtn = document.querySelector(".carousel-arrow.next");
  if (!container) return;

  const originalCards = Array.from(container.querySelectorAll(".card"));
  if (originalCards.length === 0) return;

  const visibleCount = 4;
  const cloneCount = Math.min(visibleCount, originalCards.length);

  // Clone the last cards to the front and the first cards to the end
  originalCards.slice(-cloneCount).forEach((card) => {
    container.insertBefore(card.cloneNode(true), container.firstChild);
  });
  originalCards.slice(0, cloneCount).forEach((card) => {
    container.appendChild(card.cloneNode(true));
  });

  const cards = Array.from(container.querySelectorAll(".card"));
  const offsetIndex = cloneCount;
  let currentIndex = offsetIndex;
  let intervalId = null;
  let resetTimeout = null;

  const updateActiveState = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("active-card", index === currentIndex);
    });
  };

  const jumpToIndex = (index) => {
    currentIndex = index;
    const target = cards[currentIndex];
    if (target) {
      container.scrollLeft = target.offsetLeft;
      updateActiveState();
    }
  };

  const scrollToIndex = (index) => {
    currentIndex = index;
    const target = cards[currentIndex];
    if (!target) return;

    container.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
    updateActiveState();

    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
    resetTimeout = setTimeout(() => {
      if (currentIndex >= originalCards.length + offsetIndex) {
        jumpToIndex(offsetIndex);
      } else if (currentIndex < offsetIndex) {
        jumpToIndex(originalCards.length + offsetIndex - 1);
      }
    }, 500);
  };

  const nextSlide = () => scrollToIndex(currentIndex + 1);
  const prevSlide = () => scrollToIndex(currentIndex - 1);

  const startAutoScroll = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4200);
  };

  const stopAutoScroll = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoScroll();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoScroll();
    });
  }

  container.addEventListener("mouseenter", stopAutoScroll);
  container.addEventListener("mouseleave", startAutoScroll);

  jumpToIndex(offsetIndex);
  updateActiveState();
  startAutoScroll();
}

window.addEventListener("load", () => {
  typeWriter();
  updateClock();
  initCardCarousel();

  setInterval(updateClock, 1000);
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

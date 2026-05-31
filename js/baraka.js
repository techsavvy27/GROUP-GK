// Data for the skill descriptions
const explanations = {
  Html: "HTML (HyperText Markup Language) is the standard structure for creating web pages, organizing content into headings, paragraphs, and links.",
  Css: "CSS (Cascading Style Sheets) handles the presentation, formatting, and layout of the website, including animations and responsive designs.",
  "Installation and Configuration":
    "Setting up operating systems, development environments, and essential software packages correctly for optimal performance.",
  "System Troubleshooting":
    "Diagnosing hardware and software issues, fixing errors, and restoring systems back to stable operations.",
};

// Grab all the main skill list items
const skillItems = document.querySelectorAll(".skillsbox > ol > li");

skillItems.forEach((item) => {
  const subList = item.querySelector("ul");

  if (subList) {
    // Keep them closed at the start
    subList.style.display = "none";

    // Open/close main list when clicked
    item.addEventListener("click", function (event) {
      if (event.target === item) {
        subList.style.display =
          subList.style.display === "none" ? "block" : "none";
      }
    });

    // Loop through the nested skills
    const subSkills = subList.querySelectorAll("li");

    subSkills.forEach((subSkill) => {
      subSkill.style.cursor = "pointer"; // show pointer cursor on hover

      // Use text to find matching explanation match
      const skillName = subSkill.childNodes[0].textContent.trim();

      if (explanations[skillName]) {
        // Build the text block dynamically
        const p = document.createElement("p");
        p.textContent = explanations[skillName];
        p.style.display = "none"; // start hidden
        p.style.margin = "5px 0 10px 15px";
        p.style.color = "#555";
        p.style.fontSize = "0.9em";

        // Stick it under the skill list item
        subSkill.appendChild(p);

        // Click handler to toggle the description text
        subSkill.addEventListener("click", function (event) {
          event.stopPropagation(); // stop main list from closing

          if (event.target === subSkill || event.target.tagName !== "P") {
            p.style.display = p.style.display === "none" ? "block" : "none";
          }
        });
      }
    });
  }
});

//TABLE JAVASCRIPT
const table = document.querySelector(".history-table");
const tbody = table.querySelector("tbody");
const yearHeader = table.querySelector("thead th:nth-child(3)"); // Target the Year column

// Add a cursor pointer and an interactive arrow to the header
yearHeader.style.cursor = "pointer";
yearHeader.innerHTML += ' <span id="sort-arrow">↕</span>';
const sortArrow = document.getElementById("sort-arrow");

// Sort state tracker
let isAscending = true;

// Sort rows when clicking the Year header
yearHeader.addEventListener("click", () => {
  // Convert NodeList to an array so we can sort it
  const rowsArray = Array.from(tbody.querySelectorAll("tr"));

  rowsArray.sort((rowA, rowB) => {
    const cellA = rowA.children[2].textContent.trim();
    const cellB = rowB.children[2].textContent.trim();

    // Get just the start year (handles formats like "2022-2025")
    const yearA = parseInt(cellA.split("-")[0]);
    const yearB = parseInt(cellB.split("-")[0]);

    // Check which direction to sort
    if (isAscending) {
      return yearA - yearB;
    } else {
      return yearB - yearA;
    }
  });

  // Put sorted rows back into DOM
  rowsArray.forEach((row) => tbody.appendChild(row));

  // Flip directions and update arrow icon
  if (isAscending) {
    sortArrow.textContent = "↑";
    isAscending = false;
  } else {
    sortArrow.textContent = "↓";
    isAscending = true;
  }
});

//HOBBIES
const hobbyDescriptions = {
  Gaming:
    "Gaming is one of my favorite ways to unwind after intense programming sessions. I love diving into competitive sports simulations, high-stakes tactical first-person shooters, and massive open-world games where strategy and quick reflexes are key to surviving.",
  Football:
    "Football is a major passion of mine, both playing on the pitch and analyzing tactical setups. Whether orchestrating the play from the midfield with precise passing or driving forward to create scoring opportunities, it keeps me sharp and active.",
  "Movies and Series":
    "I am a massive fan of deep storytelling, cinematic universes, and gritty character dramas. I closely follow complex cinematic universes, epic dark fantasy television series, and intense crime dramas that feature complex storytelling and brilliant acting.",
};

const hobbyItems = document.querySelectorAll(".interests-main-list > li");

hobbyItems.forEach((item) => {
  const hobbyName = item.childNodes[0].textContent.trim();

  if (hobbyDescriptions[hobbyName]) {
    // Generate the snippet text element
    const descPara = document.createElement("p");
    descPara.textContent = hobbyDescriptions[hobbyName];

    // CSS styling to clamp text to 2 lines max
    descPara.style.margin = "5px 0";
    descPara.style.color = "#666";
    descPara.style.fontSize = "0.9em";
    descPara.style.cursor = "pointer";
    descPara.style.display = "-webkit-box";
    descPara.style.webkitLineClamp = "2";
    descPara.style.webkitBoxOrient = "vertical";
    descPara.style.overflow = "hidden";
    descPara.style.transition = "all 0.3s ease";

    // Read More text link
    const toggleBtn = document.createElement("span");
    toggleBtn.textContent = " Read More";
    toggleBtn.style.color = "#007BFF";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.fontSize = "0.85em";
    toggleBtn.style.fontWeight = "bold";
    toggleBtn.style.display = "block";
    toggleBtn.style.marginBottom = "10px";

    // Drop them into the DOM right before the inner sub-list
    const subList = item.querySelector(".interests-sub-list");
    item.insertBefore(descPara, subList);
    item.insertBefore(toggleBtn, subList);

    // Expand/collapse logic
    function toggleDescription(event) {
      event.stopPropagation(); // keep it contained

      if (descPara.style.webkitLineClamp === "2") {
        descPara.style.webkitLineClamp = "none";
        toggleBtn.textContent = " Read Less";
      } else {
        descPara.style.webkitLineClamp = "2";
        toggleBtn.textContent = " Read More";
      }
    }

    // Bind event listeners to both paragraph text and toggle label
    descPara.addEventListener("click", toggleDescription);
    toggleBtn.addEventListener("click", toggleDescription);

    // Stop nested lists from bubbling clicks up
    if (subList) {
      subList.addEventListener("click", (e) => e.stopPropagation());
    }
  }
});

//IMAGE SECTION
const galleryImages = document.querySelectorAll(".slide img");

galleryImages.forEach((image) => {
  image.style.cursor = "pointer";

  image.addEventListener("click", () => {
    // Create dark background element
    const lightboxBg = document.createElement("div");
    lightboxBg.style.position = "fixed";
    lightboxBg.style.top = "0";
    lightboxBg.style.left = "0";
    lightboxBg.style.width = "100vw";
    lightboxBg.style.height = "100vh";
    lightboxBg.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    lightboxBg.style.display = "flex";
    lightboxBg.style.justifyContent = "center";
    lightboxBg.style.alignItems = "center";
    lightboxBg.style.zIndex = "10000"; // Keep on top
    lightboxBg.style.opacity = "0";
    lightboxBg.style.transition = "opacity 0.3s ease";

    // Create the image element inside the overlay
    const lightboxImg = document.createElement("img");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxImg.style.maxWidth = "85%";
    lightboxImg.style.maxHeight = "85%";
    lightboxImg.style.borderRadius = "4px";
    lightboxImg.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
    lightboxImg.style.transform = "scale(0.9)";
    lightboxImg.style.transition = "transform 0.3s ease";

    // Close button markup
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "30px";
    closeBtn.style.color = "#fff";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.userSelect = "none";

    // Append everything and mount to body
    lightboxBg.appendChild(lightboxImg);
    lightboxBg.appendChild(closeBtn);
    document.body.appendChild(lightboxBg);

    // Timeout to make sure CSS transitions handle the fade-in cleanly
    setTimeout(() => {
      lightboxBg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 10);

    // Fade out and cleanup layout safely
    function closeLightbox() {
      lightboxBg.style.opacity = "0";
      lightboxImg.style.transform = "scale(0.9)";
      setTimeout(() => {
        lightboxBg.remove();
      }, 300); // Wait out the CSS transition
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightboxBg.addEventListener("click", (e) => {
      if (e.target === lightboxBg) closeLightbox();
    });
  });
});

//SCROLL BUTTON
// Create the button element
const scrollTopBtn = document.createElement("button");

// Inject styles directly via script
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.style.position = "fixed";
scrollTopBtn.style.bottom = "30px";
scrollTopBtn.style.right = "30px";
scrollTopBtn.style.zIndex = "1000";
scrollTopBtn.style.width = "45px";
scrollTopBtn.style.height = "45px";
scrollTopBtn.style.borderRadius = "50%";
scrollTopBtn.style.backgroundColor = "#333";
scrollTopBtn.style.color = "#ffffff";
scrollTopBtn.style.border = "none";
scrollTopBtn.style.cursor = "pointer";
scrollTopBtn.style.fontSize = "20px";
scrollTopBtn.style.fontWeight = "bold";
scrollTopBtn.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";

// Set hidden visual defaults for standard transition properties
scrollTopBtn.style.opacity = "0";
scrollTopBtn.style.pointerEvents = "none";
scrollTopBtn.style.transition = "opacity 0.3s ease, transform 0.3s ease";
scrollTopBtn.style.transform = "translateY(10px)";

document.body.appendChild(scrollTopBtn);

// Show/hide button depending on scroll depth
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.pointerEvents = "auto";
    scrollTopBtn.style.transform = "translateY(0)";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.pointerEvents = "none";
    scrollTopBtn.style.transform = "translateY(10px)";
  }
});

// Click action to scroll back smoothly
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//DARKMODE
const header = document.querySelector("header");

if (header) {
  // Create toggle button element
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = "🌙 Dark";

  // Match toggle styling to root variables used across theme layout
  themeToggle.style.fontFamily = "var(--logo-font)";
  themeToggle.style.fontSize = "14px";
  themeToggle.style.fontWeight = "bold";
  themeToggle.style.padding = "6px 14px";
  themeToggle.style.cursor = "pointer";
  themeToggle.style.backgroundColor = "transparent";
  themeToggle.style.border = "1px solid var(--normal-color)";
  themeToggle.style.borderRadius = "20px";
  themeToggle.style.color = "var(--logo-color)";
  themeToggle.style.zIndex = "1001";
  themeToggle.style.transition = "all 0.2s ease";

  // Simple script listeners to mirror hover styles
  themeToggle.addEventListener("mouseenter", () => {
    themeToggle.style.backgroundColor = "var(--logo-color)";
    themeToggle.style.color = "var(--main-color)";
  });
  themeToggle.addEventListener("mouseleave", () => {
    themeToggle.style.backgroundColor = "transparent";
    themeToggle.style.color = "var(--logo-color)";
  });

  header.appendChild(themeToggle);

  // Toggle utility layout dark-mode class string reference
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change label copy dynamically on state change
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = "☀️ Light";
    } else {
      themeToggle.innerHTML = "🌙 Dark";
    }
  });
}

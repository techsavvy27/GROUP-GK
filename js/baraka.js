// Defining the explanations for each sub-skill
const explanations = {
  Html: "HTML (HyperText Markup Language) is the standard structure for creating web pages, organizing content into headings, paragraphs, and links.",
  Css: "CSS (Cascading Style Sheets) handles the presentation, formatting, and layout of the website, including animations and responsive designs.",
  "Installation and Configuration":
    "Setting up operating systems, development environments, and essential software packages correctly for optimal performance.",
  "System Troubleshooting":
    "Diagnosing hardware and software issues, fixing errors, and restoring systems back to stable operations.",
};

// Selecting all the main category list items
const skillItems = document.querySelectorAll(".skillsbox > ol > li");

skillItems.forEach((item) => {
  const subList = item.querySelector("ul");

  if (subList) {
    // Hide the main sub-list initially
    subList.style.display = "none";

    // Toggle main list on click
    item.addEventListener("click", function (event) {
      if (event.target === item) {
        subList.style.display =
          subList.style.display === "none" ? "block" : "none";
      }
    });

    // Process the sub-skills (Html, Css, etc.) inside this sub-list
    const subSkills = subList.querySelectorAll("li");

    subSkills.forEach((subSkill) => {
      subSkill.style.cursor = "pointer"; // Make it look clickable

      // Getting the text content of the sub-skill to find its explanation
      const skillName = subSkill.childNodes[0].textContent.trim();

      if (explanations[skillName]) {
        // Creating the hidden paragraph element dynamically
        const p = document.createElement("p");
        p.textContent = explanations[skillName];
        p.style.display = "none"; // Hide it by default
        p.style.margin = "5px 0 10px 15px"; // Give it a clean indentation
        p.style.color = "#555"; // Slightly distinct text color
        p.style.fontSize = "0.9em";

        // Appending the paragraph right underneath the sub-skill text
        subSkill.appendChild(p);

        // Toggle the paragraph when the sub-skill is clicked
        subSkill.addEventListener("click", function (event) {
          event.stopPropagation(); // Prevents closing the main list

          if (event.target === subSkill || event.target.tagName !== "P") {
            p.style.display = p.style.display === "none" ? "block" : "none";
          }
        });
      }
    });
  }
});
//TABLE JAVASCRIPT
// Selecting the table elements
const table = document.querySelector(".history-table");
const tbody = table.querySelector("tbody");
const yearHeader = table.querySelector("thead th:nth-child(3)"); // Targets the 'Year of Study' header

// Style the header to show it's interactive and add a subtle arrow indicator
yearHeader.style.cursor = "pointer";
yearHeader.innerHTML += ' <span id="sort-arrow">↕</span>';
const sortArrow = document.getElementById("sort-arrow");

// Tracking the current sorting direction (true = ascending, false = descending)
let isAscending = true;

// Adding the click event listener to the Year column header
yearHeader.addEventListener("click", () => {
  // Convert the HTML rows collection into a true JavaScript array so we can sort it
  const rowsArray = Array.from(tbody.querySelectorAll("tr"));

  // Sorting the array based on the text inside the 3rd column (Year of Study)
  rowsArray.sort((rowA, rowB) => {
    // Get the text content of the 3rd cell (td) in each row
    const cellA = rowA.children[2].textContent.trim();
    const cellB = rowB.children[2].textContent.trim();

    // Extract the starting year (e.g., turns "2025-Present" or "2022-2025" into just 2025 or 2022)
    const yearA = parseInt(cellA.split("-")[0]);
    const yearB = parseInt(cellB.split("-")[0]);

    // Compare the years based on the toggle direction
    if (isAscending) {
      return yearA - yearB; // Smallest year to largest
    } else {
      return yearB - yearA; // Largest year to smallest
    }
  });

  // Clear out the old rows and append the newly sorted rows
  rowsArray.forEach((row) => tbody.appendChild(row));

  // Toggle the direction flag and update the arrow visual for the user
  if (isAscending) {
    sortArrow.textContent = "↑";
    isAscending = false;
  } else {
    sortArrow.textContent = "↓";
    isAscending = true;
  }
});

//HOBBIES
//  Defining long hobby descriptions here
const hobbyDescriptions = {
  Gaming:
    "Gaming is one of my favorite ways to unwind after intense programming sessions. I love diving into competitive sports simulations, high-stakes tactical first-person shooters, and massive open-world games where strategy and quick reflexes are key to surviving.",
  Football:
    "Football is a major passion of mine, both playing on the pitch and analyzing tactical setups. Whether orchestrating the play from the midfield with precise passing or driving forward to create scoring opportunities, it keeps me sharp and active.",
  "Movies and Series":
    "I am a massive fan of deep storytelling, cinematic universes, and gritty character dramas. I closely follow complex cinematic universes, epic dark fantasy television series, and intense crime dramas that feature complex storytelling and brilliant acting.",
};

// Selecting the main hobby list items
const hobbyItems = document.querySelectorAll(".interests-main-list > li");

hobbyItems.forEach((item) => {
  // Get the main text (e.g., "Gaming") ignoring the sub-list text
  const hobbyName = item.childNodes[0].textContent.trim();

  if (hobbyDescriptions[hobbyName]) {
    // 3. Create the description paragraph dynamically
    const descPara = document.createElement("p");
    descPara.textContent = hobbyDescriptions[hobbyName];

    // Applying CSS directly via JS to clamp text to exactly 2 lines by default
    descPara.style.margin = "5px 0";
    descPara.style.color = "#666";
    descPara.style.fontSize = "0.9em";
    descPara.style.cursor = "pointer";
    descPara.style.display = "-webkit-box";
    descPara.style.webkitLineClamp = "2";
    descPara.style.webkitBoxOrient = "vertical";
    descPara.style.overflow = "hidden";
    descPara.style.transition = "all 0.3s ease";

    // 4. Create a "Read More" visual indicator link
    const toggleBtn = document.createElement("span");
    toggleBtn.textContent = " Read More";
    toggleBtn.style.color = "#007BFF";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.fontSize = "0.85em";
    toggleBtn.style.fontWeight = "bold";
    toggleBtn.style.display = "block";
    toggleBtn.style.marginBottom = "10px";

    // Find the sub-list (ul) so we can insert our new elements nicely right above it
    const subList = item.querySelector(".interests-sub-list");
    item.insertBefore(descPara, subList);
    item.insertBefore(toggleBtn, subList);

    // 5. Setup the click logic to expand/collapse
    function toggleDescription(event) {
      event.stopPropagation(); // Stops it from interfering with any other click events

      if (descPara.style.webkitLineClamp === "2") {
        // Expand the text
        descPara.style.webkitLineClamp = "none";
        toggleBtn.textContent = " Read Less";
      } else {
        // Collapse the text back to 2 lines
        descPara.style.webkitLineClamp = "2";
        toggleBtn.textContent = " Read More";
      }
    }

    // Make both the paragraph and the "Read More" text clickable triggers
    descPara.addEventListener("click", toggleDescription);
    toggleBtn.addEventListener("click", toggleDescription);

    // Stop clicks on the sub-list items (like EAFC26) from accidentally triggering a toggle
    if (subList) {
      subList.addEventListener("click", (e) => e.stopPropagation());
    }
  }
});

//IMAGE SECTION
// 1. Select all the images inside your gallery slides
const galleryImages = document.querySelectorAll(".slide img");

galleryImages.forEach((image) => {
  // Make the images look clickable
  image.style.cursor = "pointer";

  // 2. Listen for clicks on each gallery image
  image.addEventListener("click", () => {
    // 3. Create the dark overlay background
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
    lightboxBg.style.zIndex = "10000"; // Make sure it sits on top of everything
    lightboxBg.style.opacity = "0";
    lightboxBg.style.transition = "opacity 0.3s ease";

    // 4. Create the large image container
    const lightboxImg = document.createElement("img");
    lightboxImg.src = image.src; // Copy the clicked image source
    lightboxImg.alt = image.alt;
    lightboxImg.style.maxWidth = "85%";
    lightboxImg.style.maxHeight = "85%";
    lightboxImg.style.borderRadius = "4px";
    lightboxImg.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
    lightboxImg.style.transform = "scale(0.9)";
    lightboxImg.style.transition = "transform 0.3s ease";

    // 5. Create the Close button (X)
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;"; // HTML entity for a clean multiplication/X sign
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "20px";
    closeBtn.style.right = "30px";
    closeBtn.style.color = "#fff";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.userSelect = "none";

    // Assemble the lightbox elements
    lightboxBg.appendChild(lightboxImg);
    lightboxBg.appendChild(closeBtn);
    document.body.appendChild(lightboxBg);

    // Trigger smooth fade-in and scale animation via a slight timeout
    setTimeout(() => {
      lightboxBg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 10);

    // 6. Function to remove the lightbox safely with fade-out animations
    function closeLightbox() {
      lightboxBg.style.opacity = "0";
      lightboxImg.style.transform = "scale(0.9)";
      setTimeout(() => {
        lightboxBg.remove();
      }, 300); // Matches the 0.3s transition time
    }

    // Close when clicking the 'X' button
    closeBtn.addEventListener("click", closeLightbox);

    // Close when clicking anywhere on the dark background (but not the image itself)
    lightboxBg.addEventListener("click", (event) => {
      if (event.target === lightboxBg) {
        closeLightbox();
      }
    });
  });
});
//SCROLL BUTTON
// 1. Create the scroll-to-top button element dynamically
const scrollTopBtn = document.createElement("button");

// Style the button using JS
scrollTopBtn.innerHTML = "↑"; // Arrow text symbol
scrollTopBtn.style.position = "fixed";
scrollTopBtn.style.bottom = "30px";
scrollTopBtn.style.right = "30px";
scrollTopBtn.style.zIndex = "1000"; // Sits on top of other content
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

// Initial hidden state styles for a smooth fade-in effect
scrollTopBtn.style.opacity = "0";
scrollTopBtn.style.pointerEvents = "none"; // Prevents clicking while invisible
scrollTopBtn.style.transition = "opacity 0.3s ease, transform 0.3s ease";
scrollTopBtn.style.transform = "translateY(10px)"; // Starts slightly lowered

// Append the button straight into the body layout
document.body.appendChild(scrollTopBtn);

// 2. Track the user's scrolling activity
window.addEventListener("scroll", () => {
  // Check if user has scrolled past 200px
  if (window.scrollY > 200) {
    // Show the button smoothly
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.pointerEvents = "auto";
    scrollTopBtn.style.transform = "translateY(0)";
  } else {
    // Hide the button smoothly
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.pointerEvents = "none";
    scrollTopBtn.style.transform = "translateY(10px)";
  }
});

// 3. Smoothly scroll back to the top on click
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Native smooth scrolling mechanism
  });
});

//DARKMODE
// 1. Find your header element
const header = document.querySelector("header");

if (header) {
  // 2. Create the toggle button dynamically
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = "🌙 Dark";

  // Apply visual styling through JS to blend perfectly with your header rules
  themeToggle.style.fontFamily = "var(--logo-font)";
  themeToggle.style.fontSize = "14px";
  themeToggle.style.fontWeight = "bold";
  themeToggle.style.padding = "6px 14px";
  themeToggle.style.cursor = "pointer";
  themeToggle.style.backgroundColor = "transparent";
  themeToggle.style.border = "1px solid var(--normal-color)";
  themeToggle.style.borderRadius = "20px";
  themeToggle.style.color = "var(--logo-color)";
  themeToggle.style.zIndex = "1001"; // Keeps it sitting above the nav-wrapper container
  themeToggle.style.transition = "all 0.2s ease";

  // Hover animations handled natively via JS listeners
  themeToggle.addEventListener("mouseenter", () => {
    themeToggle.style.backgroundColor = "var(--logo-color)";
    themeToggle.style.color = "var(--main-color)";
  });
  themeToggle.addEventListener("mouseleave", () => {
    themeToggle.style.backgroundColor = "transparent";
    themeToggle.style.color = "var(--logo-color)";
  });

  // Append the newly formed button into your flex header layout
  header.appendChild(themeToggle);

  // 3. Toggle the dark-mode class on the body when clicked
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update button text labels dynamically based on state
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = "☀️ Light";
    } else {
      themeToggle.innerHTML = "🌙 Dark";
    }
  });
}

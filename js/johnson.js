//DARK MODE TOGGLE

(function () {
  // 1. Inject the toggle button into the header
  const header = document.querySelector("header");

  const btn = document.createElement("button");
  btn.id = "dark-mode-toggle";
  btn.setAttribute("aria-label", "Toggle dark mode");
  btn.innerHTML = `<span class="toggle-icon">🌙</span><span class="toggle-label">Dark Mode</span>`;

  header.appendChild(btn);

  // 2. Apply saved preference on page load (before paint to avoid flash)
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    updateButton(true);
  }

  // 3. Listen for clicks
  btn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateButton(isDark);
  });

  function updateButton(isDark) {
    const icon = btn.querySelector(".toggle-icon");
    const label = btn.querySelector(".toggle-label");
    if (isDark) {
      icon.textContent = "☀️";
      label.textContent = "Light Mode";
    } else {
      icon.textContent = "🌙";
      label.textContent = "Dark Mode";
    }
  }
})();

//----DARK MODE END -----


//TABLE JAVASCRIPT
let ascending = true;

function sortTable() {

  const table = document.getElementById("education-table");

  const tbody = table.querySelector("tbody");

  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {

    const yearA = parseInt(a.cells[2].innerText);

    const yearB = parseInt(b.cells[2].innerText);

    return ascending ? yearA - yearB : yearB - yearA;

  });

  rows.forEach(row => tbody.appendChild(row));

  ascending = !ascending;
}

const sortBtn = document.getElementById("sort-btn");

sortBtn.addEventListener("click", sortTable);

//---TABLE END---

//SKILLS JAVASCRIPT
const skillInfo = {             //creates an object like a drawer thts gonna store the description for each skill
  skillbox1:
  "I create responsive websites using HTML, CSS and JavaScript. I understand layouts, styling, forms and interactive pages.",
  
  skillbox2:
  "I can program using C, Java and JavaScript. I enjoy problem solving.",
  
  skillbox3:
  "I use Git, GitHub, VS Code and XAMPP for development,and testing.",
  
  skillbox4:
  "Strong communication, teamwork, time management, critical thinking and problem-solving skills."
};

document.querySelectorAll(".skillbox").forEach(box => {
  
  const details = document.createElement("div");    //creates a container div
  details.classList.add("skill-details");            //introduces anew class
  details.textContent = skillInfo[box.id];           //we introduce the extra information to the skill-details depending on the id for the iteration 
  
  box.appendChild(details);                         //the details are appended in the skillbox
  
  box.addEventListener("click", () => {
    box.classList.toggle("active");                  //creates an active class thts gonna be activated once the user clicks the skillbox
  });
  
});

//removal of the listed items in HTML
document.querySelectorAll(".skillbox ul").forEach(list => {
  list.remove();
});

//---END OF SKILLS---


//HOBBY JAVASCRIPT
const hobbyInfo = {
  box1: "Sports improve teamwork, discipline, leadership and strategic thinking.",

  box2: "Movies inspire creativity, storytelling skills and help me relax after studying.",

  box3: "Gaming improves decision-making, problem-solving and strategic planning."
};

document.querySelectorAll(".hobby-box").forEach(box => {

  // Extra text
  const extra = document.createElement("div");
  extra.classList.add("extra-text");
  extra.textContent = hobbyInfo[box.id];

  // Read More button
  const btn = document.createElement("span");
  btn.classList.add("read-more");
  btn.textContent = "Read More";

  box.appendChild(extra);
  box.appendChild(btn);

  btn.addEventListener("click", (e) => {

    e.stopPropagation();

    extra.classList.toggle("show");

    if(extra.classList.contains("show")){
      btn.textContent = "Read Less";
    }else{
      btn.textContent = "Read More";
    }

  });

});

//---HOBBY END---

//GALLERY JAVASCRIPT

// Find all images on the page
const images = document.querySelectorAll("img");

images.forEach(img => {

  img.addEventListener("click", () => {

    // Create dark background
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    // Create enlarged image
    const bigImage = document.createElement("img");
    bigImage.src = img.src;

    // Create close X button
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-lightbox");
    closeBtn.innerHTML = "&times;";

    // Add image and button
    lightbox.appendChild(bigImage);
    lightbox.appendChild(closeBtn);

    // Add to page
    document.body.appendChild(lightbox);

    // Close when X clicked
    closeBtn.addEventListener("click", () => {
      lightbox.remove();
    });

    // Close when background clicked
    lightbox.addEventListener("click", (e) => {

      if(e.target === lightbox){
        lightbox.remove();
      }

    });

  });

});
//---GALLERY END---

//SCROLL TO TOP TOGGLE
// CREATE BUTTON
const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.classList.add("scroll-top-btn");

// ADD TO PAGE
document.body.appendChild(scrollBtn);

// SHOW BUTTON AFTER 200PX SCROLL
window.addEventListener("scroll", () => {

  if(window.scrollY > 200){

    scrollBtn.classList.add("show");

  }else{

    scrollBtn.classList.remove("show");

  }

});

// SCROLL TO TOP
scrollBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
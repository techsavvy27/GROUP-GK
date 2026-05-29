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

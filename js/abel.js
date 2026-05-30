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

// skills.js
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach(item => {
    item.addEventListener("click", () => {
      const details = item.querySelector(".skill-details");
      if (details) {
        details.classList.toggle("show");
      }
    });
  });
});

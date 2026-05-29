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

const hobbyData = {
  box1: "I enjoy football and sports because it improves teamwork, discipline, and strategy.",

  box2: "Movies help me relax and inspire creativity through storytelling and visuals.",

  box3: "Gaming improves problem-solving skills and strategic thinking."
};

const hobbyBoxes = document.querySelectorAll(".hobby-box");

hobbyBoxes.forEach(box => {

  // Save original text
  const frontText = box.innerHTML;

  // Create FRONT
  const front = document.createElement("div");
  front.classList.add("hobby-front");
  front.innerHTML = frontText;

  // Create BACK
  const back = document.createElement("div");
  back.classList.add("hobby-back");
  back.innerHTML = `
    <p>${hobbyData[box.id]}</p>
  `;

  // Clear original content
  box.innerHTML = "";

  // Insert front + back
  box.appendChild(front);
  box.appendChild(back);

  // Flip on click
  box.addEventListener("click", () => {
    box.classList.toggle("flipped");
  });

});

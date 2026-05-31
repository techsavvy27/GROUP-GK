

// SKILLS TOGGLE
document.querySelectorAll(".skill-title").forEach(skill => {
    skill.addEventListener("click", () => {
        skill.nextElementSibling.classList.toggle("hidden");
    });
});


// EDUCATION SORT
let ascending = true;

document.getElementById("sortBtn").addEventListener("click", () => {

    const tbody = document.querySelector("#educationTable tbody")
        || document.querySelector("#educationTable");

    const rows = Array.from(tbody.querySelectorAll("tr"))
        .filter(row => row.querySelector("td"));

    rows.sort((a, b) => {

        const yearA = parseInt(a.cells[2].textContent);
        const yearB = parseInt(b.cells[2].textContent);

        return ascending ? yearA - yearB : yearB - yearA;
    });

    rows.forEach(row => tbody.appendChild(row));

    ascending = !ascending;
});


// HOBBIES
const hobbyText = document.getElementById("hobbyText");
const readMoreBtn = document.getElementById("readMoreBtn");

readMoreBtn.addEventListener("click", () => {

    hobbyText.classList.toggle("collapsed");

    if(hobbyText.classList.contains("collapsed")){
        readMoreBtn.textContent = "Read More";
    }else{
        readMoreBtn.textContent = "Read Less";
    }
});


// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-img").forEach(img => {

    img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });

});

document.getElementById("closeLightbox")
.addEventListener("click", () => {
    lightbox.style.display = "none";
});


// SCROLL TO TOP
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 200){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

alert("JavaScript loaded!");
// DARK MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeBtn.textContent = "☀️ Light Mode";
    }else{
        themeBtn.textContent = "🌙 Dark Mode";
    }
});
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    console.log("Button clicked");
    document.body.classList.toggle("dark-mode");
});
/*
const text = "Welcome to Group GK!";
const speed = 100;
let i = 0;

function typeWriter() {
  const target = document.getElementById("typewriter-text");

  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    // Wait 2 seconds, clear the text, and restart
    setTimeout(() => {
      target.innerHTML = "";
      i = 0;
      typeWriter();
    }, 3500);
  }
}

typeWriter();
*/

/*
function updateClock() {
    const now = new Date();
    // Formats time as HH:MM:SS (e.g., 12:30:05 PM)
    const timeString = now.toLocaleTimeString(); 
    
    document.getElementById('clock').textContent = timeString;
}

// Call updateClock every 1000ms (1 second)
setInterval(updateClock, 1000);

// Call it once immediately so the clock doesn't start blank
updateClock();
*/
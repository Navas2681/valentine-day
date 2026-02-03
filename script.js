const yes = document.getElementById("yes");
const no = document.getElementById("no");
const card = document.getElementById("card");
const yay = document.getElementById("yay");

// NO button runs away 😅
no.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  no.style.transform = `translate(${x}px, ${y}px)`;
});

// YES clicked 💖
yes.addEventListener("click", () => {
  card.classList.add("hidden");
  yay.classList.remove("hidden");
  confetti();
});

// SIMPLE CONFETTI
function confetti() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10px";
    heart.style.fontSize = "22px";
    heart.style.animation = "fall 3s linear";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
  }
}

// Animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
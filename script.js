const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const askBox = document.getElementById("ask");
const yesBox = document.getElementById("yesBox");
const area = document.querySelector(".actions");

function moveNo() {
  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseover", moveNo);   // laptop
noBtn.addEventListener("touchstart", moveNo); // mobile
noBtn.addEventListener("click", moveNo);

yesBtn.addEventListener("click", () => {
  askBox.style.display = "none";
  yesBox.style.display = "block";
});
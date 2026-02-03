// =====================
// ELEMENTS
// =====================
const creator = document.getElementById("creator");
const ask = document.getElementById("ask");
const yesBox = document.getElementById("yesBox");

const questionText = document.getElementById("questionText");
const resultText = document.getElementById("resultText");

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const music = document.getElementById("bgMusic");

const shareBtn = document.getElementById("shareBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

// =====================
// URL PARAMETERS
// =====================
const params = new URLSearchParams(window.location.search);
const girl = params.get("girl");
const boy = params.get("boy");

// =====================
// PAGE STATE ON LOAD
// =====================
if (girl && boy) {
  // Someone opened a shared link
  creator.style.display = "none";
  ask.style.display = "block";
  yesBox.style.display = "none";

  questionText.innerText =
    `Hey ${girl}, will you be ${boy}'s Valentine? 💖`;
} else {
  // Creator mode
  creator.style.display = "block";
  ask.style.display = "none";
  yesBox.style.display = "none";
}

// =====================
// GENERATE LINK
// =====================
let generatedLink = "";

document.getElementById("createLink").addEventListener("click", () => {
  const b = document.getElementById("boyName").value.trim();
  const g = document.getElementById("girlName").value.trim();

  if (!b || !g) {
    alert("Please enter both names");
    return;
  }

  const isLocal =
    location.hostname === "127.0.0.1" || location.hostname === "localhost";

  const baseURL = isLocal
    ? window.location.origin + window.location.pathname
    : "https://navas2681.github.io/valentine-day/";

  generatedLink =
    `${baseURL}?girl=${encodeURIComponent(g)}&boy=${encodeURIComponent(b)}`;

  document.getElementById("linkBox").innerHTML =
    `<a href="${generatedLink}" target="_blank">${generatedLink}</a>`;
});

// =====================
// SHARE BUTTON (SYSTEM SHARE / COPY)
// =====================
shareBtn.addEventListener("click", async () => {
  if (!generatedLink) {
    alert("Generate link first!");
    return;
  }

  if (navigator.share) {
    navigator.share({
      title: "Valentine 💖",
      text: "I have something special for you 😘",
      url: generatedLink
    });
  } else {
    await navigator.clipboard.writeText(generatedLink);
    alert("Link copied! Now share it 💌");
  }
});

// =====================
// WHATSAPP SHARE
// =====================
whatsappBtn.addEventListener("click", () => {
  if (!generatedLink) {
    alert("Generate link first!");
    return;
  }

  const text = `Hey ❤️ open this:\n${generatedLink}`;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank"
  );
});

// =====================
// NO BUTTON ESCAPE 😈
// =====================
function moveNo() {
  const area = document.querySelector(".actions");
  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);
noBtn.addEventListener("click", moveNo);

// =====================
// YES BUTTON 💖
// =====================
yesBtn.addEventListener("click", () => {
  ask.style.display = "none";
  yesBox.style.display = "block";

  resultText.innerText = `${girl} said YES! 💘`;

  music.volume = 0.7;
  music.play();
});
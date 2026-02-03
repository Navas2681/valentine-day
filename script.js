document.addEventListener("DOMContentLoaded", () => {

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
  // PAGE STATE
  // =====================
  if (girl && boy) {
    creator.style.display = "none";
    ask.style.display = "block";
    yesBox.style.display = "none";

    questionText.innerText =
      `Hey ${girl}, will you be ${boy}'s Valentine? 💖`;
  } else {
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

    const baseURL = window.location.origin + window.location.pathname;

    generatedLink =
      `${baseURL}?girl=${encodeURIComponent(g)}&boy=${encodeURIComponent(b)}`;

    document.getElementById("linkBox").innerHTML =
      `<a href="${generatedLink}" target="_blank">${generatedLink}</a>`;
  });

  // =====================
  // SHARE BUTTON
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
      alert("Link copied 💌");
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
  // NO BUTTON RUNS 😈
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

    if (music) {
      music.volume = 0.7;
      music.play();
    }

    confettiBlast();
  });

  // =====================
  // CONFETTI 🎉
  // =====================
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function confettiBlast() {
    const pieces = [];
    const colors = ["#ff4d6d", "#ff85a1", "#ffd6e0", "#ffcc00", "#ffffff"];

    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 12,
        dy: Math.random() * -12 - 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 120
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.4;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) pieces.splice(i, 1);
      });

      if (pieces.length > 0) requestAnimationFrame(animate);
    }

    animate();
  }

});

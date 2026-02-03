function show(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function move(btn) {
  btn.style.left = Math.random() * 70 + "%";
  btn.style.top = Math.random() * 70 + "%";
}
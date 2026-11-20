const canvas = document.querySelector(".canvas");
const cartButton = document.querySelector("#add-to-cart");
const cartStatus = document.querySelector("#cart-status");

function fit() {
  const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 960);
  canvas.style.transform = `scale(${scale})`;
}

fit();
window.addEventListener("resize", fit);
document.fonts.ready.then(fit);

cartButton.addEventListener("click", () => {
  const added = cartButton.classList.toggle("is-added");
  cartButton.textContent = added ? "ADDED" : "ADD TO CART";
  cartButton.setAttribute("aria-pressed", added ? "true" : "false");
  cartStatus.textContent = added
    ? "Shallow Classic added to cart. SKU 93565A84, ৳2,599."
    : "Removed from cart.";
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#home") {
      event.preventDefault();
      closePanels();
      setCurrent(link);
      return;
    }

    const panel = document.querySelector(id);
    if (!panel) return;

    event.preventDefault();
    closePanels();
    panel.hidden = false;
    setCurrent(link);
    const close = panel.querySelector("[data-close]");
    close.focus();
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closePanels();
    const home = document.querySelector('.menu a[href="#home"]');
    setCurrent(home);
    home.focus();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const open = document.querySelector(".panel:not([hidden])");
    if (!open) return;
    closePanels();
    const home = document.querySelector('.menu a[href="#home"]');
    setCurrent(home);
    home.focus();
  }
});

function closePanels() {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.hidden = true;
  });
}

function setCurrent(active) {
  document.querySelectorAll(".menu a").forEach((link) => {
    if (link === active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

const params = new URLSearchParams(window.location.search);
if (params.has("overlay")) {
  const overlay = document.createElement("img");
  overlay.className = "overlay";
  overlay.alt = "";
  overlay.src = "public/images/reference.png";
  canvas.appendChild(overlay);
}

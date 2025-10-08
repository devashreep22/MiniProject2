const rootProducts = [
  { name: "Carrot", price: "₹30 / kg", image: "images/carrot.jpg" },
  { name: "Beetroot", price: "₹40 / kg", image: "images/beetroot.jpg" },
  { name: "Radish", price: "₹20 / bunch", image: "images/radish.jpg" },
  { name: "Sweet Potato", price: "₹35 / kg", image: "images/sweetpotato.jpg" },
  { name: "Turnip", price: "₹28 / kg", image: "images/turnip.jpg" },
  { name: "Onion", price: "₹25 / kg", image: "images/onion.jpg" },
  { name: "Garlic", price: "₹60 / kg", image: "images/garlic.jpg" },
  { name: "Ginger", price: "₹70 / kg", image: "images/ginger.jpg" }
];

const container = document.getElementById("root-products");

rootProducts.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
    <div class="product-actions">
    <a href="buy.html">
      <button class="buy-now">Buy Now</button>
      <button class="add-cart">Add to Cart</button>
    </div>
  `;
  container.appendChild(card);
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load dark mode preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});


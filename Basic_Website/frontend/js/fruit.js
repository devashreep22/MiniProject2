const fruitProducts = [
  { name: "Apple", price: "₹100 / kg", image: "images/apple.jpg" },
  { name: "Banana", price: "₹40 / dozen", image: "images/banana.jpg" },
  { name: "Mango", price: "₹120 / kg", image: "images/mango.jpg" },
  { name: "Orange", price: "₹80 / kg", image: "images/orange.jpg" },
  { name: "Papaya", price: "₹60 / kg", image: "images/papaya.jpg" },
  { name: "Pineapple", price: "₹50 each", image: "images/pineapple.jpg" },
  { name: "Grapes", price: "₹90 / kg", image: "images/grapes.jpg" },
  { name: "Guava", price: "₹45 / kg", image: "images/guava.jpg" }
];

const container = document.getElementById("fruit-products");

fruitProducts.forEach((product) => {
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

// Toggle dark mode
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load dark mode preference on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

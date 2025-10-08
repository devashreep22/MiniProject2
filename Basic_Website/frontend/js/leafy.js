const leafyProducts = [
  { name: "Spinach", price: "₹30 / bunch", image: "images/spinach.jpg" },
  { name: "Coriander", price: "₹20 / bunch", image: "images/coriander.jpg" },
  { name: "Fenugreek", price: "₹25 / bunch", image: "images/fenugreek.jpg" },
  { name: "Amaranth", price: "₹35 / bunch", image: "images/amaranth.jpg" },
  { name: "Mint Leaves", price: "₹15 / bunch", image: "images/mint.jpg" },
  { name: "Spring Onion", price: "₹40 / bunch", image: "images/springonion.jpg" },
  { name: "Lettuce", price: "₹50 / piece", image: "images/lettuce.jpg" },
  { name: "Cabbage", price: "₹45 / bunch", image: "images/cabbage.jpg" }
];

const container = document.getElementById("leafy-products");

leafyProducts.forEach((product) => {
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

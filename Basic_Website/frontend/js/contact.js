document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      message: message,
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    alert("Thank you for contacting us, " + name + "! We’ll get back to you shortly.");
    document.getElementById("contactForm").reset();
  })
  .catch((error) => {
    console.error("Error sending message:", error);
    alert("Something went wrong. Please try again.");
  });
});

function continueShopping() {
  window.location.href = "index.html";
}
// Scroll to Product Section
document.querySelector('.product-link')?.addEventListener('click', () => {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// Sample product data
const products = [
  {
    id: 1, name: 'Spinach', price: 30, image: 'images/spinach.jpg', category: 'leafy'
  },
  {
    id: 2, name: 'Carrot', price: 25, image: 'images/carrot.jpg', category: 'root'
  },
  {
    id: 3, name: 'Apple', price: 100, image: 'images/apple.jpg', category: 'fruits'
  },
  {
    id: 4, name: 'Potato', price: 20, image: 'images/potato.jpg', category: 'root'
  },
  {
    id: 5, name: 'Lettuce', price: 35, image: 'images/lettuce.jpg', category: 'leafy'
  },
  {
    id: 6, name: 'Banana', price: 60, image: 'images/banana.jpg', category: 'fruits'
  },
  {
    id: 7, name: 'Mango', price: 80, image: 'images/mango.jpg', category: 'fruits'
  },
  {
    id: 8, name: 'Radish', price: 22, image: 'images/radish.jpg', category: 'root'
  }
];

let selectedCategory = 'leafy'; // default category
let quantities = {}; // stores quantities of each product

function renderProducts(category) {
  selectedCategory = category;
  const container = document.querySelector('.product-cards');
  container.innerHTML = '';

  const filtered = products.filter(p => p.category === category);
  filtered.forEach(product => {
    quantities[product.id] = quantities[product.id] || 1;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="card-buttons">
        <button onclick="buyNow(${product.id})">Buy Now</button>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
      <div class="quantity-control">
        <button onclick="decrement(${product.id})">-</button>
        <span id="qty-${product.id}">${quantities[product.id]}</span>
        <button onclick="increment(${product.id})">+</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function increment(id) {
  quantities[id]++;
  document.getElementById(`qty-${id}`).innerText = quantities[id];
}

function decrement(id) {
  if (quantities[id] > 1) {
    quantities[id]--;
    document.getElementById(`qty-${id}`).innerText = quantities[id];
  }
}

function buyNow(id) {
  alert(`Buying ${quantities[id]} of ${products.find(p => p.id === id).name}`);
}

function addToCart(id) {
  alert(`Added ${quantities[id]} of ${products.find(p => p.id === id).name} to cart`);
}

// Category click event
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    const type = cat.dataset.category;
    renderProducts(type);
  });
});

// On load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(selectedCategory);
});

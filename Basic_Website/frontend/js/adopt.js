document.addEventListener("DOMContentLoaded", () => {
  const farms = [
    {
      name: "Green Valley Farm",
      farmer: "Anil Patil",
      location: "Nashik, Maharashtra",
      images: ["tomato.jpg", "onion.jpg", "potato.jpg"],
      cropNames: "Tomatoes, Onions, Potato",
      price: 1500,
      img: "images/farmer1.jpg"
    },
    {
      name: "Sahyadri Organic Farm",
      farmer: "Sunita Jadhav",
      location: "Kolhapur, Maharashtra",
      images: ["sugarcane.png", "rice.png"],
      cropNames: "Sugarcane, Rice",
      price: 1800,
      img: "images/farmer2.jpg"
    },
    {
      name: "Natural Roots Farm",
      farmer: "Rajeev Desai",
      location: "Pune, Maharashtra",
      images: ["spinach.jpg", "carrot.jpg", "banana.jpg"],
      cropNames: "Spinach, Carrot, Banana",
      price: 1200,
      img: "images/farmer3.jpg"
    }
  ];

  const farmContainer = document.getElementById("farmContainer");
  farmContainer.innerHTML = "";

  farms.forEach(farm => {
    const card = document.createElement("div");
    card.className = "farm-card";

    const cropsHtml = farm.images.map(cropIcon => {
      return `<img src="images/${cropIcon}" alt="crop" title="${cropIcon.split('.')[0]}" />`;
    }).join("");

    card.innerHTML = `
      <img class="farmer-img" src="${farm.img}" alt="Farmer Image" />
      <h3>${farm.name}</h3>
      <p><strong>Farmer:</strong> ${farm.farmer}</p>
      <p class="location"><span class="emoji-pin">📍</span> ${farm.location}</p>
      <div class="crops-icons">${cropsHtml}</div>
      <p><strong>Crops:</strong> ${farm.cropNames}</p>
      <p><strong>Adoption Plan:</strong> ₹${farm.price}/month</p>
      <button 
        class="contact-btn"
        data-farm-name="${farm.name}"
        data-farmer-name="${farm.farmer}"
      >
        Contact Farmer
      </button>
    `;

    farmContainer.appendChild(card);
  });

  // Add event listeners to all contact buttons after DOM is updated
  document.querySelectorAll(".contact-btn").forEach(button => {
    button.addEventListener("click", function () {
      const farmName = this.getAttribute("data-farm-name");
      const farmerName = this.getAttribute("data-farmer-name");

      // Save to localStorage
      localStorage.setItem("selectedFarmName", farmName);
      localStorage.setItem("selectedFarmerName", farmerName);

      // Redirect
      window.location.href = "contactfarmer.html";
    });
  });
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});


// Apply dark mode on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});
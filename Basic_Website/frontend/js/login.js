// 🔁 Toggle Login/Signup Forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginToggle = document.getElementById("loginToggle");
const signupToggle = document.getElementById("signupToggle");

loginToggle.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  loginToggle.classList.add("active");
  signupToggle.classList.remove("active");
});

signupToggle.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  signupToggle.classList.add("active");
  loginToggle.classList.remove("active");
});

// 👤 Show/Hide Farmer Fields
const roleRadios = document.getElementsByName("role");
const farmerFields = document.getElementById("farmerFields");

roleRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.checked && radio.value === "farmer") {
      farmerFields.classList.remove("hidden");
    } else {
      farmerFields.classList.add("hidden");
    }
  });
});

// ✅ Email & Phone Validation
document.getElementById("signupForm").addEventListener("submit", function (e) {
  const email = document.getElementById("signupEmail");
  const phone = document.getElementById("signupPhone");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[6-9]\d{9}$/;

  if (!emailPattern.test(email.value)) {
    alert("❌ Invalid email format!");
    email.focus();
    e.preventDefault();
    return;
  }

  if (!phonePattern.test(phone.value)) {
    alert("❌ Phone number must be 10 digits and start with 6-9.");
    phone.focus();
    e.preventDefault();
    return;
  }

  const selectedRole = document.querySelector('input[name="role"]:checked').value;
  if (selectedRole === "farmer") {
    const crops = document.getElementById("crops");
    const land = document.getElementById("land");
    if (!crops.value || !land.value) {
      alert("❌ Please fill in crop and land information.");
      e.preventDefault();
      return;
    }
  }

  alert("✅ Registration Successful!");
});

// 📍 Get User Geolocation
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        const locationInput = document.getElementById("location");
        locationInput.value = `Lat: ${lat}, Lon: ${lon}`;
        alert("📍 Location captured successfully!");
      },
      () => {
        alert("❌ Couldn’t access your location. Please enter it manually.");
      }
    );
  } else {
    alert("❌ Your browser does not support location access.");
  }
}

// 🌙 Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 👁️ Toggle Password Visibility
function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    toggleIcon.textContent = "🙈";
  } else {
    input.type = "password";
    toggleIcon.textContent = "👁️";
  }
}

// 🏞️ District → Taluka Dropdown Logic
const talukas = {
  sangli: ["Miraj", "Jat", "Walwa", "Tasgaon", "Kavthe Mahankal"],
  pune: ["Haveli", "Mulshi", "Baramati", "Junnar", "Shirur"],
  satara: ["Satara", "Karad", "Wai", "Phaltan", "Mahabaleshwar"],
  kolhapur: ["Karveer", "Panhala", "Shirol", "Hatkanangale", "Ajra"],
  mumbai: ["Andheri", "Bandra", "Borivali", "Dadar", "Goregaon"]
};

document.getElementById("district").addEventListener("change", function () {
  const talukaSelect = document.getElementById("taluka");
  talukaSelect.innerHTML = '<option value="">Select Taluka</option>';
  const selected = talukas[this.value];
  if (selected) {
    selected.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      talukaSelect.appendChild(opt);
    });
  }
});

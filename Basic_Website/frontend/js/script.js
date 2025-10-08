document.addEventListener("DOMContentLoaded", () => {
  // Scroll to top function
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle dark/light mode
  const modeToggle = document.getElementById("toggle-mode");
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      modeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  }

  // Language translation
  const languageDropdown = document.getElementById("languageDropdown");
  const translations = {
    en: {
      title: "Fresh Food From Farm2You",
      description: "We deliver farm-fresh vegetable and fruits right to your doorstep.",
      orderNow: "Order Now",
      explore: "Explore"
    },
    hi: {
      title: "Farm2You से ताज़ा सब्ज़ियां",
      description: "हम आपके दरवाज़े पर ताज़ी सब्ज़ियां और फल पहुंचाते हैं।",
      orderNow: "अब ऑर्डर करें",
      explore: "देखें"
    },
    mr: {
      title: "Farm2You कडून ताजे भाज्या",
      description: "आम्ही तुमच्या दारापर्यंतच भाज्या आणि फळे पोहोचवतो.",
      orderNow: "ऑर्डर करा",
      explore: "अन्वेषण करा"
    }
  };

  if (languageDropdown) {
    languageDropdown.addEventListener("change", function () {
      const lang = this.value;
      document.getElementById("hero-title").textContent = translations[lang].title;
      document.getElementById("hero-desc").textContent = translations[lang].description;
      document.getElementById("orderBtn").textContent = translations[lang].orderNow;
      document.getElementById("exploreBtn").textContent = translations[lang].explore;
    });
  }

  // Chatbot only on homepage
  const isHomePage = document.body.classList.contains("home-page");
  const chatbotBtn = document.querySelector(".chatbot-btn");
  if (chatbotBtn && isHomePage) {
    chatbotBtn.addEventListener("click", () => {
      alert("AI Chatbot coming soon! 🤖");
    });
  } else if (chatbotBtn) {
    chatbotBtn.style.display = "none";
  }
});

  document.addEventListener("DOMContentLoaded", function () {
    const exploreBtn = document.getElementById("exploreBtn");
    const productSection = document.getElementById("products");

    if (exploreBtn && productSection) {
      exploreBtn.addEventListener("click", function () {
        productSection.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      console.error("Button or section not found");
    }
  });


// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navbar = document.querySelector(".navbar");

if (mobileMenuToggle && navbar) {
  mobileMenuToggle.addEventListener("click", () => {
    navbar.classList.toggle("mobile-menu-open");
    const icon = mobileMenuToggle.querySelector("i");
    if (navbar.classList.contains("mobile-menu-open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("mobile-menu-open");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}
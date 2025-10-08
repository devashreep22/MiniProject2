document.addEventListener("DOMContentLoaded", () => {
  const methodSelect = document.getElementById("payment-method");
  const form = document.getElementById("donation-form");

  const upiSection = document.getElementById("upi-section");
  const netbankingSection = document.getElementById("netbanking-section");
  const cardSection = document.getElementById("card-section");

  const darkToggle = document.getElementById("darkModeToggle");

  // Load dark mode preference
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    document.body.classList.add("dark-mode");
    if (darkToggle) darkToggle.checked = true;
  }

  // Dark mode toggle logic
  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
  }

  // Payment method switch
  if (methodSelect) {
    methodSelect.addEventListener("change", () => {
      // Hide all sections first
      [upiSection, netbankingSection, cardSection].forEach(section => {
        section.style.display = "none";
      });

      // Show selected section
      switch (methodSelect.value) {
        case "upi":
          upiSection.style.display = "block";
          break;
        case "netbanking":
          netbankingSection.style.display = "block";
          break;
        case "card":
          cardSection.style.display = "block";
          break;
      }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.fullname.value.trim();
      const amount = form.amount.value.trim();
      const method = form["method"].value;

      if (!name || !amount || !method) {
        alert("Please complete all required fields.");
        return;
      }

      alert(`Thank you, ${name}! Your ₹${amount} donation via ${method} has been received.`);
      form.reset();

      [upiSection, netbankingSection, cardSection].forEach(section => {
        section.style.display = "none";
      });
    });
  }
});

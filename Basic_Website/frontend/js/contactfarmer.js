document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("yourName").value;
  const farm = document.getElementById("farmId").value;

  document.getElementById("responseMessage").textContent = `✅ Thank you, ${name}! Your request to adopt farm "${farm}" has been received.`;

  this.reset();
});

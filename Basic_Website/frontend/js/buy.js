function applyCoupon() {
  const basePrice = 300;
  const gst = 15;
  const couponCode = document.getElementById("coupon").value.trim().toUpperCase();
  let discount = 0;

  if (couponCode === "SAVE20") {
    discount = 20;
    alert("Coupon applied! ₹20 off.");
  } else if (couponCode) {
    alert("Invalid coupon code.");
  }

  const total = basePrice + gst - discount;
  document.getElementById("totalPrice").textContent = {total};
}
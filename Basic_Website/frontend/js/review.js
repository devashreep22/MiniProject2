const carousel = document.getElementById("carousel");

function scrollLeft() {
  const scrollAmount = carousel.offsetWidth;
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });

  // Optional: Circular scroll
  if (carousel.scrollLeft <= 0) {
    carousel.scrollLeft = carousel.scrollWidth;
  }
}

function scrollRight() {
  const scrollAmount = carousel.offsetWidth;
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });

  // Optional: Circular scroll
  if (carousel.scrollLeft + scrollAmount >= carousel.scrollWidth) {
    carousel.scrollLeft = 0;
  }
}

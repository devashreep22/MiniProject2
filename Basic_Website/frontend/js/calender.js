/* ===============================
   Seasonal Produce Data (All 12 Months)
   =============================== */
const produceData = {
  January: { 
    fruits: ["🍊 Oranges", "🍎 Apples", "🍌 Bananas"], 
    vegetables: ["🥕 Carrots", "🥬 Spinach", "🥦 Broccoli"] 
  },
  February: { 
    fruits: ["🍓 Strawberries", "🥭 Guavas", "🍍 Pineapples"], 
    vegetables: ["🥦 Cauliflower", "🍃 Peas", "🥔 Potatoes"] 
  },
  March: { 
    fruits: ["🥭 Mangoes", "🍍 Pineapples", "🍌 Bananas"], 
    vegetables: ["🌽 Corn", "🥒 Cucumbers", "🥬 Lettuce"] 
  },
  April: { 
    fruits: ["🥭 Mangoes", "🍉 Watermelons", "🍌 Bananas"], 
    vegetables: ["🍅 Tomatoes", "🥒 Cucumbers", "🥬 Spinach"] 
  },
  May: { 
    fruits: ["🥭 Mangoes", "🍍 Pineapples", "🍉 Watermelons"], 
    vegetables: ["🥒 Cucumbers", "🌶 Bell Peppers", "🍅 Tomatoes"] 
  },
  June: { 
    fruits: ["🍈 Muskmelons", "🥭 Mangoes", "🍉 Watermelons"], 
    vegetables: ["🌽 Corn", "🥬 Amaranth", "🥒 Cucumbers"] 
  },
  July: { 
    fruits: ["🍇 Grapes", "🍌 Bananas", "🍈 Muskmelons"], 
    vegetables: ["🍆 Brinjals", "🥒 Cucumbers", "🥬 Fenugreek"] 
  },
  August: { 
    fruits: ["🍇 Grapes", "🍌 Bananas", "🍏 Green Apples"], 
    vegetables: ["🥬 Spinach", "🥔 Potatoes", "🥕 Carrots"] 
  },
  September: { 
    fruits: ["🍌 Bananas", "🍏 Green Apples", "🍇 Grapes"], 
    vegetables: ["🥦 Broccoli", "🥬 Spinach", "🌽 Corn"] 
  },
  October: { 
    fruits: ["🍎 Apples", "🍊 Oranges", "🍇 Grapes"], 
    vegetables: ["🥔 Potatoes", "🥕 Carrots", "🥦 Cauliflower"] 
  },
  November: { 
    fruits: ["🍊 Oranges", "🍎 Apples", "🥭 Guavas"], 
    vegetables: ["🥦 Broccoli", "🥬 Spinach", "🥒 Cucumbers"] 
  },
  December: { 
    fruits: ["🍊 Oranges", "🍎 Apples", "🍌 Bananas"], 
    vegetables: ["🥕 Carrots", "🥔 Potatoes", "🥦 Cauliflower"] 
  }
};

/* ===============================
   Select Elements
   =============================== */
const calendarPopup = document.getElementById("calendarPopup");
const calendarToggle = document.getElementById("calendarToggle");
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");

/* ===============================
   Toggle Calendar Visibility
   =============================== */
calendarToggle.addEventListener("click", () => {
  calendarPopup.style.display =
    calendarPopup.style.display === "block" ? "none" : "block";
});

/* Close when clicking outside */
document.addEventListener("click", (e) => {
  if (!calendarPopup.contains(e.target) && !calendarToggle.contains(e.target)) {
    calendarPopup.style.display = "none";
  }
});

/* ===============================
   Initialize Calendar
   =============================== */
let currentDate = new Date();
renderCalendar(currentDate);

/* Navigation Buttons */
document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});
document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

/* ===============================
   Render Calendar Function
   =============================== */
function renderCalendar(date) {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
 monthYear.textContent = `${month} ${year}`;


  const firstDay = new Date(year, date.getMonth(), 1).getDay();
  const lastDate = new Date(year, date.getMonth() + 1, 0).getDate();

  calendar.innerHTML = "";

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day");
    calendar.appendChild(emptyCell);
  }

  // Days with tooltips
  for (let day = 1; day <= lastDate; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");

    const dayNumber = document.createElement("h4");
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    if (produceData[month]) {
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.innerHTML = `
        <strong>Fruits:</strong> ${produceData[month].fruits.join(", ")}<br>
        <strong>Veggies:</strong> ${produceData[month].vegetables.join(", ")}
      `;
      dayCell.appendChild(tooltip);
    }

    calendar.appendChild(dayCell);
  }
}
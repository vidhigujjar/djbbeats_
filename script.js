// DJ B BEATS booking form and page interactions
"use strict";

const DJ_WHATSAPP = "918200501062";

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Do not allow selecting a date in the past. Use local calendar date.
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localDate;
}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      eventType: document.getElementById("event").value,
      date: document.getElementById("date").value,
      location: document.getElementById("location").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    const errors = {
      name: document.getElementById("nameError"),
      phone: document.getElementById("phoneError"),
      email: document.getElementById("emailError"),
      eventType: document.getElementById("eventError"),
      date: document.getElementById("dateError"),
      location: document.getElementById("locationError")
    };
    const status = document.getElementById("status");

    Object.values(errors).forEach((element) => { element.textContent = ""; });
    status.textContent = "";

    let valid = true;
    const cleanPhone = fields.phone.replace(/[\\s()-]/g, "");

    if (fields.name.length < 2) {
      errors.name.textContent = "Please enter your name.";
      valid = false;
    }
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      errors.phone.textContent = "Enter a valid 10-digit mobile number.";
      valid = false;
    }
    if (fields.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(fields.email)) {
      errors.email.textContent = "Enter a valid email address.";
      valid = false;
    }
    if (!fields.eventType) {
      errors.eventType.textContent = "Please select your event.";
      valid = false;
    }
    if (!fields.date || (dateInput && fields.date < dateInput.min)) {
      errors.date.textContent = "Please select today or a future date.";
      valid = false;
    }
    if (fields.location.length < 2) {
      errors.location.textContent = "Please enter the event location.";
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please correct the errors above.";
      return;
    }

    const bookingMessage = [
      "Hello DJ B BEATS! I want to book a DJ.",
      "",
      `Name: ${fields.name}`,
      `Mobile: ${fields.phone}`,
      `Email: ${fields.email || "Not provided"}`,
      `Event: ${fields.eventType}`,
      `Event Date: ${fields.date}`,
      `Location: ${fields.location}`,
      `Additional Details: ${fields.message || "Not provided"}`,
      "",
      "Please share your availability and pricing. Thank you!"
    ].join("\\n");

    const whatsappURL = `https://wa.me/${DJ_WHATSAPP}?text=${encodeURIComponent(bookingMessage)}`;
    status.textContent = "WhatsApp is opening. Please review the booking details and press Send.";
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

// Close the mobile navigation after a section link is selected.
document.querySelectorAll("#mainMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mainMenu");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

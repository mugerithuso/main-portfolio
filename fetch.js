// DOM Elements

const contactForm = document.getElementById("form");
const formMessage = document.getElementById("formMessage");
const submitText = document.getElementById("submitText");
const loadingText = document.getElementById("loadingText");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(this);

  fetch("https://formsubmit.co/ajax/your@email.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Simulate form submission with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        formMessage.textContent =
          "Thank you for your message! I'll get back to you soon.";
        formMessage.className = "form-message success";

        // Reset button state
        submitText.style.display = "inline-flex";
        loadingText.style.display = "none";

        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.className = "form-message";
        }, 5000);
      }, 1500);
    })
    .catch((error) => {
      // Show success message
      formMessage.textContent = error;
      formMessage.className = "form-message error";
    });
});

// DOM Elements

const contactForm = document.getElementById("form");
const formMessage = document.getElementById("formMessage");
const submitText = document.getElementById("submitText");
const loadingText = document.getElementById("loadingText");
let submitButton = document.getElementById("submitButton");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(this);
  let loder = document.querySelector(".loader");

  //Showing loading and desabling submit button
  submitButton.disabled = true;
  loder.style.display = "block";

  let jsonData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };
  console.log(jsonData);

  fetch("https://formsubmit.co/ajax/mugerithuso@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(formData);
      // Simulate form submission with timeout
      setTimeout(() => {
        // Reset form
        form.reset();

        // Show success message
        formMessage.textContent =
          "Thank you for your message! I'll get back to you soon.";
        formMessage.className = "form-message success";

        // Reset button state
        submitText.style.display = "inline-flex";
        loadingText.style.display = "none";

        // Clear message after 4 seconds
        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.className = "form-message";
        }, 4000);

        // hide loading and enabling submit button
        submitButton.disabled = false;
        loder.style.display = "none";
      }, 1500);
    })
    .catch((error) => {
      // Show success message
      formMessage.textContent = error;
      formMessage.className = "form-message error";
    });
});

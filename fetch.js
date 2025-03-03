// DOM Elements

const formMessage = document.getElementById("formMessage");
const submitText = document.getElementById("submitText");
const loadingText = document.getElementById("loadingText");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let form = this;
  let submitButton = form.querySelector("button[type='submit']");

  //Showing loading and desabling submit button
  submitButton.disabled = true;

  let formData = new FormData(this);

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
      }, 1500);
    })
    .catch((error) => {
      // Show success message
      formMessage.textContent = " messege not sent: " + error;
      formMessage.className = "form-message error";
      setTimeout(() => {
        formMessage.textContent = "";
        formMessage.className = "form-message";
      }, 4000);
    });
});

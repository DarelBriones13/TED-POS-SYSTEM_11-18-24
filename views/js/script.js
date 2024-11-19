document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link"),
    usernameField = document.querySelector("input[name='username']"),
    errorMessage = document.querySelector(".error-message");

  // JS code to show/hide password and change icon
  pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      pwFields.forEach((pwField) => {
        // Toggle the password type
        const isPassword = pwField.type === "password";
        pwField.type = isPassword ? "text" : "password";

        // Change the eye icon based on the password visibility
        eyeIcon.classList.toggle("uil-eye-slash", isPassword);
        eyeIcon.classList.toggle("uil-eye", !isPassword);
      });
    });
  });

  // JS code to appear signup and login form
  signUp?.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.add("active");
  });

  login?.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.remove("active");
  });

  // Clear error message when interacting with the username field
  usernameField?.addEventListener("focus", () => {
    if (errorMessage) {
      errorMessage.textContent = ""; // Clear the text content of the error message
      errorMessage.style.display = "none"; // Optionally hide the element
    }
  });
});

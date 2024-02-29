const emailEl = document.getElementById("email");
const form = document.getElementById("signup");

// Utility functions

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// Value validation functions
const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// Error, success display functions
const showError = (inputEl, message) => {
  const formField = inputEl.closest(".form-field");

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (inputEl) => {
  const formField = inputEl.closest(".form-field");

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

// Field validation functions
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// Event listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isEmailValid = checkEmail();
  let isFormValid = isEmailValid;

  if (isFormValid) {
    console.log("Form is valid");
  }
});

form.addEventListener(
  "input",
  debounce((event) => {
    if (event.target.id === "email") {
      checkEmail();
    }
  }),
);

function showErrorMessage(id, message) {
  const error = document.getElementById(id);

  if (error) {
    error.textContent = message;
    error.style.display = "block";
    error.style.color = "red";
  }
}

function clearErrorMessage() {
  const errors = [
    "full_name_error",
    "email_error",
    "mobile_error",
    "department_error",
    "course_error",
  ];

  errors.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = "";
      el.style.display = "none";
    }
  });
}

function validateEnrollForm(event) {
  event.preventDefault();
  clearErrorMessage();
  let isValid = true;

  const fullName = document.getElementById("full_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneInput = document.getElementById("popup_mobile");
  const mobile = popupIti.getNumber();
  const mobileValue = phoneInput.value.trim();
  const department = document.getElementById("department").value.trim();
  const course = document.getElementById("courses").value.trim();

  const namePattern = /^[A-Za-z]+(?:[ .][A-Za-z]+)*$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (fullName === "") {
    showErrorMessage("full_name_error", "Full Name is required.");
    isValid = false;
  } else if (fullName.length > 25) {
    showErrorMessage(
      "full_name_error",
      "Full Name must not exceed 25 characters.",
    );
    isValid = false;
  } else if (!namePattern.test(fullName)) {
    showErrorMessage(
      "full_name_error",
      "Only letters, a single space, and dots are allowed.",
    );
    isValid = false;
  }

  if (email === "") {
    showErrorMessage("email_error", "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showErrorMessage("email_error", "Please enter a valid email address.");
    isValid = false;
  }

  if (mobileValue === "") {
    showErrorMessage("mobile_error", "Mobile Number is required.");
    isValid = false;
  } else if (!popupIti || !popupIti.isValidNumber()) {
    showErrorMessage("mobile_error", "Please enter a valid mobile number.");
    isValid = false;
  }

  if (department === "") {
    showErrorMessage("department_error", "Please select a department.");
    isValid = false;
  }

  if (course === "") {
    showErrorMessage("course_error", "Please select a course.");
    isValid = false;
  }

  if (!isValid) {
    return false;
  }
  const fullMobileNumber = popupIti.getNumber();

  console.log("iti.getNumber():", fullMobileNumber);
  console.log("phoneInput.value:", phoneInput.value);

  document.getElementById("popup_mobile").value = fullMobileNumber;

  submitFormData({
    fullName,
    email,
    mobile: fullMobileNumber,
    department,
    course,
  });
  return false;
}

function submitFormData(formData) {
  console.log("Form data being sent:", formData);

  fetch("/enrollSubmit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((data) => {
      window.location.href = "/success";
    })

    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error while submitting the form.");
    });
}

function showSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.style.color = "green";
  successMessage.textContent =
    "Enrollment submitted successfully! Redirecting...";

  successMessage.style.fontSize = "16px";
  successMessage.style.padding = "10px";
  successMessage.style.border = "1px solid #4CAF50";
  successMessage.style.backgroundColor = "#d4edda";
  successMessage.style.marginBottom = "20px";

  const formContainer = document.getElementById("enrollForm");
  formContainer.insertBefore(successMessage, formContainer.firstChild);
}

document.getElementById("full_name").addEventListener("input", function () {
  const value = this.value.trim();
  const error = document.getElementById("full_name_error");
  const namePattern = /^[A-Za-z]+(?:[ .][A-Za-z]+)*$/;

  if (value === "") {
    error.textContent = "";
    error.style.display = "none";
  } else if (value.length > 25) {
    error.textContent = "Full Name must not exceed 25 characters.";
    error.style.display = "block";
  } else if (!namePattern.test(value)) {
    error.textContent = "Only letters, a single space, and dots are allowed.";
    error.style.display = "block";
  } else {
    error.textContent = "";
    error.style.display = "none";
  }
});

document.getElementById("email").addEventListener("input", function () {
  const value = this.value.trim();
  const error = document.getElementById("email_error");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (value === "") {
    error.textContent = "";
    error.style.display = "none";
  } else if (!emailPattern.test(value)) {
    error.textContent = "Please enter a valid email address.";
    error.style.display = "block";
  } else {
    error.textContent = "";
    error.style.display = "none";
  }
});

const mobileInput = document.getElementById("popup_mobile");
const mobileError = document.getElementById("mobile_error");

mobileInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^\d]/g, "");

  if (this.value.trim() === "") {
    mobileError.textContent = "";
    mobileError.style.display = "none";
  } else if (!popupIti.isValidNumber()) {
    mobileError.textContent = "Please enter a valid mobile number.";
    mobileError.style.display = "block";
  } else {
    mobileError.textContent = "";
    mobileError.style.display = "none";
  }
});

// Clear Department error
document.getElementById("department").addEventListener("change", function () {
  if (this.value !== "") {
    const error = document.getElementById("department_error");
    error.textContent = "";
    error.style.display = "none";
  }
});

// Clear Course error
document.getElementById("courses").addEventListener("change", function () {
  if (this.value !== "") {
    const error = document.getElementById("course_error");
    error.textContent = "";
    error.style.display = "none";
  }
});

const phoneInput = document.getElementById("popup_mobile");

phoneInput.addEventListener("countrychange", function () {
  phoneInput.dispatchEvent(new Event("input"));
});

phoneInput.addEventListener("input", function () {
  const mobileError = document.getElementById("mobile_error");

  if (popupIti && popupIti.isValidNumber() && mobileError) {
    mobileError.textContent = "";
    mobileError.style.display = "none";
  }
});

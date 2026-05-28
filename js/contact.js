//THIS IS AI GENERATED

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(inputElement, errorElement, message) {
  inputElement.classList.add('input-error');
  errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
  inputElement.classList.remove('input-error');
  errorElement.textContent = '';
}

function validateForm() {
  let isValid = true;

  if (!nameInput.value.trim()) {
    showError(nameInput, nameError, 'Name is required.');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email is required.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!messageInput.value.trim()) {
    showError(messageInput, messageError, 'Message is required.');
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  return isValid;
}

form.addEventListener('submit', function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

form.addEventListener('input', function (event) {
  if (event.target === nameInput) {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
    }
  }

  if (event.target === emailInput) {
    if (emailInput.value.trim() && emailRegex.test(emailInput.value.trim())) {
      clearError(emailInput, emailError);
    }
  }

  if (event.target === messageInput) {
    if (messageInput.value.trim()) {
      clearError(messageInput, messageError);
    }
  }
});

form.addEventListener('reset', function () {
  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(messageInput, messageError);
});
export const isValidEmail = (email) => {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// utils/validation.js
export const containsNumber = (str) => /\d/.test(str);

export const isValidPassword = (password) => {
  // Check if password length is at least 6 characters
  return password.length >= 6;
};

export const isValidPhone = (phone) => {
  // Regular expression for validating phone numbers (supports numbers with optional country code)
  const phoneRegex = /^[+]?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
};

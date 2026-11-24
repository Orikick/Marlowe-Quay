const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export const MESSAGE_MIN_LENGTH = 20;

// Returns { fieldName: message } for every invalid field; an empty object means valid.
export function validateEnquiry({ name, email, phone, message }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Enter your name.';
  }

  if (!email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter an email address like name@example.com.';
  }

  if (phone.trim() && !PHONE_PATTERN.test(phone.trim())) {
    errors.phone = 'Enter a phone number using digits, spaces and an optional + sign.';
  }

  if (message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `Write at least ${MESSAGE_MIN_LENGTH} characters so the agent knows what you need.`;
  }

  return errors;
}

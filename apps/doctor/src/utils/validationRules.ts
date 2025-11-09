// Validation rules for forms
// Centralized validation constants to keep form logic clean and maintainable

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  PHONE: {
    MIN_LENGTH: 10,
    PATTERN: "^[+]?[1-9][0-9]{7,14}$",
  },
  LICENSE: {
    MIN_LENGTH: 5,
  },
  EXPERIENCE: {
    MIN: 0,
    MAX: 50,
  },
  CONSULTATION_FEE: {
    MIN: 0,
    MAX: 10000,
  },
} as const;

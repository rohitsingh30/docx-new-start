// Form-related utility functions
import { FORM_CONSTANTS } from '../constants/formConstants';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.length < FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH) {
    return { isValid: false, error: `Name must be at least ${FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH} characters` };
  }
  if (name.length > FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH) {
    return { isValid: false, error: `Name must be no more than ${FORM_CONSTANTS.VALIDATION.MAX_NAME_LENGTH} characters` };
  }
  return { isValid: true };
};

export const validateExperience = (experience: number): { isValid: boolean; error?: string } => {
  if (experience < FORM_CONSTANTS.VALIDATION.MIN_EXPERIENCE || experience > FORM_CONSTANTS.VALIDATION.MAX_EXPERIENCE) {
    return { 
      isValid: false, 
      error: `Experience must be between ${FORM_CONSTANTS.VALIDATION.MIN_EXPERIENCE} and ${FORM_CONSTANTS.VALIDATION.MAX_EXPERIENCE} years` 
    };
  }
  return { isValid: true };
};

export const validateConsultationFee = (fee: number): { isValid: boolean; error?: string } => {
  if (fee < FORM_CONSTANTS.VALIDATION.MIN_CONSULTATION_FEE || fee > FORM_CONSTANTS.VALIDATION.MAX_CONSULTATION_FEE) {
    return { 
      isValid: false, 
      error: `Fee must be between $${FORM_CONSTANTS.VALIDATION.MIN_CONSULTATION_FEE} and $${FORM_CONSTANTS.VALIDATION.MAX_CONSULTATION_FEE}` 
    };
  }
  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

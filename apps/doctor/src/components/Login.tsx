import React, { useState, FormEvent } from 'react';
import styles from '../styles/Login.module.css';
import { useAuth } from '../contexts/AuthContext';
import { STRING_CONSTANTS, ERROR_MESSAGES } from '../constants/stringConstants';
import { FormFieldType } from '../types/enums';

/**
 * Login component - Two-column layout with branding and form
 * Based on Login.html mock design from /mocks/Login.html
 * 
 * MOCK CREDENTIALS (from dataConstants.ts):
 * - doctor@docx.com / doctor123
 * - demo@docx.com / demo123
 * - admin@docx.com / admin123
 * 
 * Features:
 * - Two-column responsive layout (left: branding, right: form)
 * - CareConnect branding with health_and_safety icon
 * - Email/password validation
 * - Password visibility toggle
 * - Remember me checkbox
 * - Loading states
 * - Error handling with clear messages
 * - Accessible form with ARIA labels
 * - Material Symbols Outlined icons
 * - Responsive design (single column on mobile)
 * - Dev-only bypass for quick testing (only in development)
 */
const Login: React.FC = () => {
  const { login, devLogin, isLoading } = useAuth();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (!validateEmail(email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    // Password validation
    if (!password) {
      newErrors.password = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (password.length < 6) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous general error
    setErrors((prev) => ({ ...prev, general: undefined }));

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error instanceof Error ? error.message : ERROR_MESSAGES.LOGIN_FAILED,
      }));
    }
  };

  /**
   * Handle input change and clear errors
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        {/* Left Column - Branding */}
        <div className={styles.leftPanel}>
          <div className={styles.brandingContent}>
            <div className={styles.logoIconLarge}>
              <span className={styles.materialIcon}>health_and_safety</span>
            </div>
            <h2 className={styles.brandName}>{STRING_CONSTANTS.LABELS.APP_NAME}</h2>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            {/* Mobile Logo */}
            <div className={styles.mobileHeader}>
              <div className={styles.mobileLogo}>
                <div className={styles.logoIconSmall}>
                  <span className={styles.materialIcon}>health_and_safety</span>
                </div>
                <h2 className={styles.mobileAppName}>{STRING_CONSTANTS.LABELS.APP_NAME}</h2>
              </div>
            </div>

            {/* Form Header */}
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>{STRING_CONSTANTS.LABELS.WELCOME_BACK}</h1>
              <p className={styles.formSubtitle}>{STRING_CONSTANTS.LABELS.LOGIN_TO_CONTINUE}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
              {/* General Error Message */}
              {errors.general && (
                <div className={styles.errorAlert} role="alert">
                  {errors.general}
                </div>
              )}

              {/* Email Field */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {STRING_CONSTANTS.LABELS.EMAIL_ADDRESS}
                </label>
                <input
                  id="email"
                  type={FormFieldType.EMAIL}
                  value={email}
                  onChange={handleEmailChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder={STRING_CONSTANTS.PLACEHOLDERS.ENTER_EMAIL}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span id="email-error" className={styles.errorMessage} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password Field with Toggle */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  {STRING_CONSTANTS.LABELS.PASSWORD}
                </label>
                <div className={styles.passwordInputWrapper}>
                  <input
                    id="password"
                    type={showPassword ? FormFieldType.TEXT : FormFieldType.PASSWORD}
                    value={password}
                    onChange={handlePasswordChange}
                    className={`${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
                    placeholder={STRING_CONSTANTS.PLACEHOLDERS.ENTER_PASSWORD}
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                    aria-label={STRING_CONSTANTS.BUTTONS.TOGGLE_PASSWORD_VISIBILITY}
                    disabled={isLoading}
                  >
                    <span className={styles.materialIcon}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span id="password-error" className={styles.errorMessage} role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className={styles.formOptions}>
                <div className={styles.rememberMeWrapper}>
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkbox}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className={styles.checkboxLabel}>
                    {STRING_CONSTANTS.LABELS.REMEMBER_ME}
                  </label>
                </div>
                <button type="button" className={styles.forgotPasswordLink} disabled={isLoading}>
                  {STRING_CONSTANTS.BUTTONS.FORGOT_PASSWORD}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                <span className={styles.materialIcon}>lock</span>
                {isLoading ? STRING_CONSTANTS.MESSAGES.LOADING : STRING_CONSTANTS.BUTTONS.LOGIN}
              </button>

              {/* Development-only Quick Login Bypass */}
              {isDevelopment && (
                <button
                  type="button"
                  onClick={devLogin}
                  className={styles.devBypassButton}
                  disabled={isLoading}
                  title={STRING_CONSTANTS.TITLES.DEV_QUICK_LOGIN}
                >
                  🚀 Quick Login (Dev Only)
                </button>
              )}
            </form>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.copyright}>{STRING_CONSTANTS.LABELS.COPYRIGHT}</p>
              <div className={styles.footerLinks}>
                <a href="#" className={styles.footerLink}>{STRING_CONSTANTS.LABELS.HELP}</a>
                <span className={styles.footerSeparator}>·</span>
                <a href="#" className={styles.footerLink}>{STRING_CONSTANTS.LABELS.PRIVACY}</a>
                <span className={styles.footerSeparator}>·</span>
                <a href="#" className={styles.footerLink}>{STRING_CONSTANTS.LABELS.TERMS}</a>
              </div>
            </div>

            {/* Development Notice */}
            {isDevelopment && (
              <div className={styles.devNotice}>
                <small>
                  💡 Development Mode - You can use the quick login button above or test with:{' '}
                  <code>doctor@docx.com</code> / <code>doctor123</code>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

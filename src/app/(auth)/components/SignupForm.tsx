"use client";
import { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill, BsFillPersonFill, BsFillKeyFill, BsFillEnvelopeFill } from "react-icons/bs";
import styles from "./../styles/Login.module.css";
import { isValidEmail } from "@/app/utils/validation";

export default function SignupForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
     event.preventDefault();

     const email = event.currentTarget.email.value;
     const password = event.currentTarget.password.value;
     const confirmPassword = event.currentTarget.confirmPassword.value;

     // Set error messages if validation fails
     if (!isValidEmail(email)) { // Replace isValidEmail with your email validation logic
       setEmailError("Please enter a valid email address");
     } else {
       setEmailError("");
     }

     if (password.length < 6) { // Example password validation
       setPasswordError("Password must be at least 6 characters");
     } else {
       setPasswordError("");
     }

     if (password.length < 6) { // Example password validation
       setPasswordError("Password must be at least 6 characters");
     } else {
       setPasswordError("");
     }

     if (password !== confirmPassword) {
       setConfirmPasswordError("Passwords do not match");
     } else {
       setConfirmPasswordError("");
     }


     // If there are no errors, proceed with signup
     if (
       !emailError &&
       !passwordError &&
       !confirmPasswordError
     ) {
       // ... your signup logic ...
     }

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <BsFillEnvelopeFill className={styles.inputIcon} />
          <input type="email" placeholder="Email" name="email" required />
        </div>
        {emailError && <div className={styles.error}>{emailError}</div>}
        <div className={styles.inputGroup}>
          <BsFillKeyFill className={styles.inputIcon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
          />
          <button type="button" className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </div>
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        <div className={styles.inputGroup}>
          <BsFillKeyFill className={styles.inputIcon} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
          <button type="button" className={styles.showPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </div>
        {confirmPasswordError && (
          <div className={styles.error}>{confirmPasswordError}</div>
        )}
        <button type="submit" className={styles.loginButton}>
          Sign Up
        </button>
      </form>

    </>
  );
}

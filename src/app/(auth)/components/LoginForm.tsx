"use client";
import { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill, BsFillEnvelopeFill, BsFillKeyFill } from "react-icons/bs";
import styles from "./../styles/Login.module.css";
import { isValidEmail } from "@/app/utils/validation";


export default function Loginform(){
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
     event.preventDefault();

     const email = event.currentTarget.email.value;
     const password = event.currentTarget.password.value;

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

     // If there are no errors, proceed with login
     if (!emailError && !passwordError) {
       // ... your login logic ...
     }
  }
  return (
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
          <button type="button" className={styles.showPassword} onClick={toggleShowPassword}>
            {/* Add show/hide password icon here */}
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        </div>
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
  );
}

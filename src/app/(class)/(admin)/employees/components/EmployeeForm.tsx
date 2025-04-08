// components/EmployeeForm.tsx
"use client";

import { useState } from "react";
import styles from "./../styles/Employee.module.css";

interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: boolean;
}

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(employee?.name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const [position, setPosition] = useState(employee?.position || "");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [positionError, setPositionError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPositionError("");

    let hasErrors = false;

    if (!name) {
      setNameError("Name is required");
      hasErrors = true;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasErrors = true;
    }

    // Phone validation (example - you might need a more robust validation)
    if (phone.length < 10) {
      setPhoneError("Please enter a valid phone number");
      hasErrors = true;
    }

    // Position validation
    if (!position) {
      setPositionError("Position is required");
      hasErrors = true;
    }


    if (hasErrors) {
      return;
    }

    onSubmit({
      id: employee?.id,
      name,
      email,
      phone,
      position,
      status: employee?.status?? true,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{employee? "Edit Employee": "Create Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <div className={styles.error}>{nameError}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phoneError && <div className={styles.error}>{phoneError}</div>}
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          {positionError && (
            <div className={styles.error}>{positionError}</div>
          )}
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
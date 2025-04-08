"use client";

import { useState } from "react";
import styles from "./../styles/Admin.module.css";

interface Admin {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "superadmin";
  status: boolean;
}

interface AdminFormProps {
  admin?: Admin;
  onSubmit: (admin: Admin) => void;
  onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({
  admin,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [phone, setPhone] = useState(admin?.phone || "");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [role, setRole] = useState(admin?.role || "admin"); 
  const [roleError, setRoleError] = useState(""); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPhoneError("");

    let hasErrors = false;

    if (!name) {
      setNameError("Name is required");
      hasErrors = true;
    }

    if (!role) {
      setRoleError("Role is required");
      hasErrors = true;
    }    

    //... (Other validations for email and phone)...

    if (hasErrors) {
      return;
    }

    onSubmit({
      id: admin?.id,
      name,
      email,
      phone,
      role,
      status: admin?.status?? true,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{admin? "Edit Admin": "Create Admin"}</h2>
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
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Admin["role"])}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          {roleError && <div className={styles.error}>{roleError}</div>}
        </div>        
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
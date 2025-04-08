// components/CompanyForm.tsx
"use client";

import { useState } from "react";
import styles from "./../styles/Company.module.css";

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

interface CompanyFormProps {
  company?: Company;
  onSubmit: (company: Company) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(company?.name || "");
  const [address, setAddress] = useState(company?.address || "");
  const [phone, setPhone] = useState(company?.phone || "");
  const [taxId, setTaxId] = useState(company?.taxId || "");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset previous errors
    setNameError("");
    setAddressError("");
    setPhoneError("");

    let hasErrors = false;

    if (!name) {
      setNameError("Name is required");
      hasErrors = true;
    }

    if (!address) {
      setAddressError("Address is required");
      hasErrors = true;
    }

    if (!phone) {
      setPhoneError("Phone is required");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    onSubmit({
      id: company!.id,
      name,
      address,
      phone,
      taxId,
      active: company!.active,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Edit Company</h2>
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
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {addressError && <div className={styles.error}>{addressError}</div>}
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
          <label htmlFor="taxId">Tax ID:</label>
          <input
            type="text"
            id="taxId"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
          />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
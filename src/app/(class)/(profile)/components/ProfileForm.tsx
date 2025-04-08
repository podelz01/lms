import { useState } from "react";
import styles from "./../styles/Profile.module.css";

interface ProfileDetailsProps {
  fullName: string;
  phoneNumber: string;
  email: string;
  onSave: (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
  }) => void;
}

export default function ProfileDetails({
  fullName,
  phoneNumber,
  email,
  onSave,
}: ProfileDetailsProps) {
  const [inputFullName, setInputFullName] = useState(fullName);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber);
  const [inputEmail, setInputEmail] = useState(email);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      fullName: inputFullName,
      phoneNumber: inputPhoneNumber,
      email: inputEmail,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={inputFullName}
          onChange={(e) => setInputFullName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={inputPhoneNumber}
          onChange={(e) => setInputPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.saveButton}>
        Save
      </button>
    </form>
  );
}
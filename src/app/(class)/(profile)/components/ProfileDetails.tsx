import styles from "./../styles/Profile.module.css";

interface ProfileDisplayProps {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export default function ProfileDisplay({
  fullName,
  phoneNumber,
  email,
}: ProfileDisplayProps) {
  return (
    <>
      <div className={styles.detailItem}>
          <span className={styles.label}>Full Name:</span> {fullName}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Phone Number:</span> {phoneNumber}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Email:</span> {email}
        </div>      
    </>
  );
}
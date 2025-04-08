import styles from "./../styles/Partner.module.css";

interface Partner {
  id: number;
  companyName: string;
  logo: string; // URL to the partner's logo
  summaryService: string;
  website: string; // URL to the partner's website
  contactEmail: string; // Partner's contact email address
  phoneNumber: string; // Partner's phone number
  location: string; // Partner's location (city, country)
  // ... other fields as needed
}

interface PartnerCardProps {
  partner: Partner;
  onClick: () => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.logoContainer}>
        <img src={partner.logo} alt={partner.companyName + " logo"} />
      </div>
      <h3>{partner.companyName}</h3>
      <p>{partner.summaryService}</p>
      <div className={styles.contactInfo}>
        <p>
          <a href={partner.website} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </p>
        <p>Email: {partner.contactEmail}</p>
        <p>Phone: {partner.phoneNumber}</p>
        <p>Location: {partner.location}</p>
      </div>
    </div>
  );
};

export default PartnerCard;
// components/CompanyDetails.tsx
"use client";

import styles from "./../styles/Company.module.css";

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

interface CompanyDetailsProps {
  company: Company;
  onEdit: (company: Company) => void;

}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ 
  company,
  onEdit,
 }) => {
  return (
    <div className={styles.companyDetailsContainer}>
      <div>
        <div>
          <span className={styles.label}>Name:</span> {company.name}
        </div>
        <div>
          <span className={styles.label}>Address:</span> {company.address}
        </div>
        <div>
          <span className={styles.label}>Phone:</span> {company.phone}
        </div>
        <div>
          <span className={styles.label}>Tax ID:</span>{" "}
          {company.taxId? company.taxId: "-"}
        </div>
        <div>
          <span className={styles.label}>Status:</span>{" "}
          {company.active? "active": "Non-active"}
        </div>
        <button type="button" onClick={() => onEdit(company)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
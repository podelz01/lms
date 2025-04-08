// components/ClientDetails.tsx
"use client";

import styles from "./../styles/Clients.module.css";

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

interface ClientDetailsProps {
  client: Client;
  onCancel: () => void;

}

const ClientDetails: React.FC<ClientDetailsProps> = ({ 
  client,
  onCancel,
 }) => {
  return (
    <div className={styles.clientDetailsContainer}>
      <h2>Client Details</h2>
      <div>
        <div>
          <span className={styles.label}>Name:</span> {client.name}
        </div>
        <div>
          <span className={styles.label}>Address:</span> {client.address}
        </div>
        <div>
          <span className={styles.label}>Phone:</span> {client.phone}
        </div>
        <div>
          <span className={styles.label}>Tax ID:</span>{" "}
          {client.taxId? client.taxId: "-"}
        </div>
        <div>
          <span className={styles.label}>Status:</span>{" "}
          {client.active? "active": "Non-active"}
        </div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;
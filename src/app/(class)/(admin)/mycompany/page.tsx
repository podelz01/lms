// pages/client-profile.tsx
"use client";

import { useState } from "react";
import styles from "./styles/Company.module.css";
import ClientDetails from "./components/CompanyDetails";
import CompanyForm from "./components/CompanyForm";

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

const dummyCompany: Company = 
  {
    id: 1,
    name: "Client A Client A Client A Client A",
    address: "123 Main St",
    phone: "555-1234",
    taxId: "TAX-123",
    active: true,
  };


export default function Company() {
  
  const [company, setCompany] = useState(dummyCompany);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (updatedCompany: Company) => {
    setCompany(updatedCompany);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <h1>My Company</h1>

      {/* ... (create/edit client form) ... */}
      {(isEditing) && (
        <CompanyForm 
          company={company}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      )}

      {!isEditing && (
        <ClientDetails 
          company={company} 
          onEdit={handleEdit}          
        />
      )}



    </div>
  );
}
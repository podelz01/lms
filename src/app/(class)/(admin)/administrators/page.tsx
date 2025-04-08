"use client";

import { useState } from "react";
import styles from "./styles/Admin.module.css";
import AdminList from "./components/AdminList";
import AdminForm from "./components/AdminForm";

interface Admin {
  id?: number;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  role: "admin"|"superadmin";
}

const dummyAdmins: Admin = [
  {
    id: 1,
    name: "Your Name Your Name Your Name Your Name Your Name Your Name Your Name Your Name ",
    email: "your.emailyour.emailyour.emailyour.emailyour.email@example.com",
    phone: "123-456-7890",
    status: true,
    role: "admin"
  },
  {
    id: 2,
    name: "Admin 2",
    email: "admin2@example.com",
    phone: "987-654-3210",
    status: false,
    role: "superadmin"
  },
  //... more admins
];

export default function Admins() {
  const [admins, setAdmins] = useState(dummyAdmins);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(5); // Adjust as needed
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Search/filter logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredAdmins = admins.filter((admin) => {
    const status = admin.status? "active": "non-active";
    const values = Object.values(admin).map((value) =>
      String(value).toLowerCase(),
    );
    values.push(status);
    return values.some((value) => value.includes(searchTerm));
  });

  // Pagination logic
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Create admin logic
  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleCreateSubmit = (newAdmin: Admin) => {
    setAdmins([...admins, {...newAdmin, id: admins.length + 1 }]);
    setIsCreating(false);
  };

  // Edit admin logic
  const handleEdit = (admin: Admin) => {
    setIsEditing(true);
    setEditingAdmin(admin);
  };

  const handleEditSubmit = (updatedAdmin: Admin) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === updatedAdmin.id? updatedAdmin: admin,
      ),
    );
    setIsEditing(false);
    setEditingAdmin(null);
  };

  // Toggle status logic
  const handleToggleStatus = (adminId: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId? {...admin, status:!admin.status }: admin,
      ),
    );
  };


  return (
    <div className={styles.container}>
      <h1>Administrators</h1>

      {/* Create Admin Button */}
      <div className={styles.createButtonContainer}>
        <button onClick={handleCreate} className={styles.createButton}>
          Create Administrator
        </button>
      </div>

      {/* Admin Form */}
      {(isCreating || isEditing) && (
        <AdminForm
          admin={isEditing? editingAdmin: undefined}
          onSubmit={isCreating? handleCreateSubmit: handleEditSubmit}
          onCancel={() => {
            setIsCreating(false);
            setIsEditing(false);
            setEditingAdmin(null);
          }}
        />
      )}      

      {/* Search/Filter */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>

      {/* Admin List */}
      <AdminList
        admins={filteredAdmins}
        currentPage={currentPage}
        adminsPerPage={adminsPerPage}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        onPageChange={paginate}
      />



    </div>
  );
}
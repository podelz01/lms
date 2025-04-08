"use client";

import styles from "./../styles/Admin.module.css";

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "superadmin";
  status: boolean;
}

interface AdminListProps {
  admins: Admin;
  currentPage: number;
  adminsPerPage: number;
  onEdit: (admin: Admin) => void;
  onToggleStatus: (adminId: number) => void;
  onPageChange: (pageNumber: number) => void;
}

const AdminList: React.FC<AdminListProps> = ({
  admins,
  currentPage,
  adminsPerPage,
  onEdit,
  onToggleStatus,
  onPageChange,
}) => {
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAdmins.map((admin) => (
              <tr key={admin.id} data-active={admin.status}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>{admin.role}</td>
                <td>
                  <button
                    onClick={() => onToggleStatus(admin.id)}
                    disabled={admin.name === "My Name"} // Disable for current user
                  >
                    {admin.status? "active": "Non-active"}
                  </button>
                </td>
                <td>
                  <button onClick={() => onEdit(admin)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(admins.length / adminsPerPage) },
          (_, i) => (
            <button key={i + 1} onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default AdminList;
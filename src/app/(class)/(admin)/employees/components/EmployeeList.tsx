"use client";

import styles from "./../styles/Employee.module.css";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: boolean;
}

interface EmployeeListProps {
  employees: Employee;
  currentPage: number;
  employeesPerPage: number;
  onEdit: (employee: Employee) => void;
  onViewDetails: (employeeId: number) => void;
  onToggleStatus: (employeeId: number) => void;
  onPageChange: (pageNumber: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  currentPage,
  employeesPerPage,
  onEdit,
  onViewDetails,
  onToggleStatus,
  onPageChange,
}) => {
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.employeeTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} data-active={employee.status}>
                <td onClick={() => onViewDetails(employee.id)}>
                  {employee.name}
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => onToggleStatus(employee.id)}>
                    {employee.status? "active": "Non-active"}
                  </button>
                </td>
                <td>
                  <button onClick={() => onEdit(employee)}>Edit</button>
                  <button onClick={() => onViewDetails(employee.id)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={currentPage === i + 1? styles.activePage: ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EmployeeList;
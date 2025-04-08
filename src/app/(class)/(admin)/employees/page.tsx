"use client";

import { useState } from "react";
import styles from "./styles/Employee.module.css";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeImport from "./components/EmployeeImport"; 

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: boolean;
}

const dummyEmployees: Employee = [
  {
    id: 1,
    name: "Employee A",
    email: "employee.a@example.com",
    phone: "123-456-7890",
    position: "Manager",
    status: true,
  },
  {
    id: 2,
    name: "Employee B",
    email: "employee.b@example.com",
    phone: "987-654-3210",
    position: "Staff",
    status: false,
  },
  //... more employees
];

export default function Employees() {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Adjust as needed
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  // Search/filter logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredEmployees = employees.filter((employee) => {
    const status = employee.status? "active": "non-active";
    const values = Object.values(employee).map((value) =>
      String(value).toLowerCase(),
    );
    values.push(status);
    return values.some((value) => value.includes(searchTerm));
  });

  // Pagination logic
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Create employee logic
  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleCreateSubmit = (newEmployee: Employee) => {
    setEmployees([...employees, {...newEmployee, id: employees.length + 1 }]);
    setIsCreating(false);
  };

  // Edit employee logic
  const handleEdit = (employee: Employee) => {
    setIsEditing(true);
    setEditingEmployee(employee);
  };

  const handleEditSubmit = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id? updatedEmployee: employee,
      ),
    );
    setIsEditing(false);
    setEditingEmployee(null);
  };

  // Toggle status logic
  const handleToggleStatus = (employeeId: number) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === employeeId
        ? {...employee, status:!employee.status }
        : employee,
      ),
    );
  };

  // View details logic
  const handleViewDetails = (employeeId: number) => {
    // Implement navigation to the employee details page
    console.log("View details for employee ID:", employeeId);
  };


  const handleImport = () => {
    setIsImporting(true);
  };

  const handleImportSubmit = (newEmployees: Employee) => {
    setEmployees([...employees,...newEmployees]);
    setIsImporting(false);
  };

  return (
    <div className={styles.container}>
      <h1>Employees</h1>

      {/* Create Employee Button */}
      <div className={styles.createButtonContainer}>
        <button onClick={handleCreate} className={styles.createButton}>
          Create Employee
        </button>
        <button onClick={handleImport} className={styles.createButton}>
          Import Employees
        </button>
      </div>

      {/* Employee Form */}
      {(isCreating || isEditing) && (
        <EmployeeForm
          employee={isEditing? editingEmployee: undefined}
          onSubmit={isCreating? handleCreateSubmit: handleEditSubmit}
          onCancel={() => {
            setIsCreating(false);
            setIsEditing(false);
            setEditingEmployee(null);
          }}
        />
      )}

      {/* Employee Import */}
      {isImporting && (
        <EmployeeImport
          onImport={handleImportSubmit}
          onCancel={() => setIsImporting(false)}
        />
      )}

      {/* Search/Filter */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>

      {/* Employee List */}
      <div className={styles.tableContainer}>
        <EmployeeList
          employees={filteredEmployees}
          currentPage={currentPage}
          employeesPerPage={employeesPerPage}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onToggleStatus={handleToggleStatus}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
}
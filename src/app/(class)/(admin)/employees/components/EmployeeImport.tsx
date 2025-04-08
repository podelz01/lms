"use client";

import { useState } from "react";
import styles from "./../styles/Employee.module.css";

interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: boolean;
}

interface EmployeeImportProps {
  onImport: (employees: Employee) => void;
  onCancel: () => void;
}

const EmployeeImport: React.FC<EmployeeImportProps> = ({
  onImport,
  onCancel,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;

    if (selectedFile) {
      setFile(selectedFile[0]);
      setError("");
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (file.type!== "text/csv") {
      setError("Invalid file type. Please select a CSV file.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.readyState === FileReader.DONE) {  // Check if the reader is done
          const contents = e.target?.result as string;
          const employees = parseCSV(contents);
          onImport(employees);
        } else {
          setError("Error reading file. Reader not ready.");
        }
    };
      reader.readAsText(file);
    } catch (error) {
      setError("Invalid file format.");
    }
  };

  // Implement parseCSV function to parse the CSV data
  const parseCSV = (contents: string): Employee => {

    const rows = contents.split("\n");
    const headers = rows[0].split(",");    
  
    const employees: Employee = [];
  
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const employee: Employee = {} as Employee;
  
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        const value = row[j].trim();
  
        // Convert status to boolean
        if (header === "status") {
          employee[header] = value.toLowerCase() === "true";
        } else {
          employee[header] = value;
        }
      }

      employees.push(employee);
    }
    return employees;
  };

  return (
    <div className={styles.importContainer}>
      <h2>Import Employees</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <div className={styles.error}>{error}</div>}
      <p>
        Download sample CSV file:{" "}
        <a href="/employee_sample.csv" download>
          employee_sample.csv
        </a>
      </p>
      <button onClick={handleImport}>Import</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EmployeeImport;
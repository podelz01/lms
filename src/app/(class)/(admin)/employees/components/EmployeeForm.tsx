// components/EmployeeForm.tsx
"use client";
import styles from "./../styles/Employee.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: boolean;
}

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
}) => {


  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone is required"),
    position: Yup.string().required("Position is required"),
  });

  const initialValues = {
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    position: employee?.position || "",
  };


  return (
    <div className={styles.formContainer}>
      <h2>{employee? "Edit Employee": "Create Employee"}</h2>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          onSubmit({ ...employee, ...values }); // Merge existing employee with new values
          setSubmitting(false);          
        }}
        >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email"  />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <Field type="tel" id="phone" name="phone"  />
            <ErrorMessage name="phone" component="div" className={styles.error} />
          </div>
          <div>
            <label htmlFor="position">Position:</label>
            <Field type="text" id="position" name="position" />
            <ErrorMessage name="position" component="div" className={styles.error} />
          </div>
          <button type="submit" disabled={isSubmitting}> {isSubmitting ? "Saving..." : "Save"}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </Form>
        )}

        </Formik>
    </div>
  );
};

export default EmployeeForm;
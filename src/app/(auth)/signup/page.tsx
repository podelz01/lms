import Link from "next/link";
import styles from "./../styles/Login.module.css"; // Reuse the same styles
import SignupForm from "@/app/(auth)/components/SignupForm";
import SpinnerLink from "@/app/components/spinnerlink/SpinnerLink";

export default function Signup(): JSX.Element {

  return (
    <>
      <h1>Create an Account</h1>
      <SignupForm />
      <p className={styles.signup}>
        Already have an account?{" "}
        <SpinnerLink href="/login" className={styles.signupLink}>
          Login
        </SpinnerLink>
      </p>
    </>
  );
}

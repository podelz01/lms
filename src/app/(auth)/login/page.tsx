import Link from "next/link";
import styles from "./../styles/Login.module.css";
import LoginForm from "@/app/(auth)/components/LoginForm";
import SpinnerLink from "@/app/components/spinnerlink/SpinnerLink";

export default function Login(): JSX.Element {
  return (
    <>
      <h1>Welcome Back!</h1>
      <LoginForm />
      <p className={styles.signup}>
        Doesn't have an account?{" "}
        <SpinnerLink href="/signup" className={styles.signupLink}>
          Sign Up for free
        </SpinnerLink>
      </p>
    </>
  );
}

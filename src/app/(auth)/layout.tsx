import styles from "./styles/Login.module.css"; // Reuse the same styles

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.logo}>Kuncie</div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla nec purus feugiat, molestie ipsum et, fermentum odio.
            </p>
          </div>
          <div className={styles.rightSide}>
            {children}
          </div>
        </div>
      </div>
  )
}

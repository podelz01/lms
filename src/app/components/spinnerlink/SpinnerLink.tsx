// components/SpinnerLink.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './SpinnerLink.module.css'; // Create this CSS module

const SpinnerLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate loading delay (replace with your actual logic)
    await new Promise(resolve => setTimeout(resolve, 10));

    // Redirect to the target link
    window.location.href = href;
  };

  return (
    <Link href={href} onClick={handleClick} className={styles.link}>
        {isLoading && <span className={styles.spinner}></span>}
        {children}
    </Link>
  );
};

export default SpinnerLink;

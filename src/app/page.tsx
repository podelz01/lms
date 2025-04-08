// pages/index.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in (replace with your actual logic)
    const isLoggedIn = true; // Example: Assume user is logged in

    if (isLoggedIn) {
      router.replace("/mycompany"); // Redirect to /mycompany if logged in
    } else {
      router.replace("/login"); // Redirect to /login if not logged in
    }
  }, [router]);

  return (
    <div>
      <div className="loader">
        <div className="spinner"></div> {/* Simple spinner animation */}
      </div>
    </div>
  );
}
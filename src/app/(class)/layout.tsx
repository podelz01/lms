'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '@/app/styles/Layout.module.css';
import {
  FaBars,
  FaTimes,
  FaCaretDown,
  FaCaretUp,
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaCog,
  FaTh,
  FaUsers,
  FaProjectDiagram,
  FaChevronUp,
  FaChevronDown,
  FaBuilding,
  FaUserTie,
  FaHandshake,
 } from "react-icons/fa";
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfigsOpen, setIsConfigsOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleConfigs = () => {
    setIsConfigsOpen(!isConfigsOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLAsideElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
        &&
        isMenuOpen // Only close if the sidebar is open
      ) {
        setIsMenuOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);  

      }      
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);


  return (
      <div className={styles.container}>
        <aside ref={sidebarRef} className={`${styles.sidebar} ${isMenuOpen ? styles.open : ''}`}>
          <button className={styles.closeButton} onClick={toggleMenu}>
            <FaTimes />
          </button>
          {/* Sidebar content */}
          <nav>
            <ul>
              <li>
                <FaTh className={styles.menuIcon} />
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <FaEnvelope className={styles.menuIcon} />
                <Link href="/mail">Mail</Link>
              </li>
              <li>
                <FaCog className={styles.menuIcon} />
                <Link href="/settings">Settings</Link>
              </li>
              <li className={styles.groupHeader} onClick={toggleConfigs}>
                Settings
                <span className={styles.toggleIcon}> {/* Add toggle icon */}
                  {isConfigsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </li> {/* Group header */}
              {isConfigsOpen && (
                <>
                  <li className={styles.nestedItem}>
                    <FaBuilding className={styles.menuIcon} />
                    <Link href="/mycompany">My Company</Link>
                  </li>
                  <li className={styles.nestedItem}>
                    <FaUsers className={styles.menuIcon} />
                    <Link href="/administrators">Administrators</Link>
                  </li>
                  <li className={styles.nestedItem}>
                    <FaUserTie className={styles.menuIcon} />
                    <Link href="/employees">Employees</Link>
                  </li>
                  <li className={styles.nestedItem}>
                    <FaHandshake className={styles.menuIcon} />
                    <Link href="/partners">Training Providers</Link>
                  </li>
                  <li className={styles.nestedItem}>
                    <FaProjectDiagram className={styles.menuIcon} />
                    <Link href="/projects">Projects</Link>
                  </li> 
                </>            
              )} 
            </ul>
          </nav>
        </aside>

        <main className={styles.main}>
          <header className={styles.header}>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <FaBars />
            </button>
            <div className={styles.headerTitle}>Kuncie</div>
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button className={styles.dropdownButton} onClick={toggleDropdown}>
                <div className={styles.profileCircle}>
                  KF
                </div>
                {isDropdownOpen ? (
                  <FaCaretUp className={styles.dropdownIcon} />
                ) : (
                  <FaCaretDown className={styles.dropdownIcon} />
                )}
              </button>
              {isDropdownOpen && ( // Conditionally render dropdown menu
                <ul className={styles.dropdownMenu}>
                  <li>
                    <FaUser className={styles.menuIcon} />
                    <Link href="/profile">Profil</Link>
                  </li>
                  <li>
                    <FaSignOutAlt className={styles.menuIcon} />
                    <Link href="/logout">Keluar</Link>
                  </li>
                </ul>
              )}
            </div>

          </header>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
  );
}

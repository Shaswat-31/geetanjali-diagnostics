"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import styles from "./navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const darkMode = savedTheme === 'dark';
    setDarkMode(darkMode);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleDarkMode = (checked) => {
    const newTheme = checked ? 'dark' : 'light';
    setDarkMode(checked);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import styles from "./navbar.module.css";
import { ArrowLeftIcon} from '@chakra-ui/icons'
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const darkMode = savedTheme === 'dark';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleDarkMode = (checked) => {
    const newTheme = checked ? 'dark' : 'light';
    setDarkMode(checked);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  const handleBack = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      pathSegments.pop();
      const newPath = `/${pathSegments.join('/')}`;
      router.push(newPath);
    } else {
      router.push('/'); // Navigate to home if at the root level
    }
  };
  return (
    <div className={styles.container}>
       <button
        onClick={handleBack}
        className={styles.backButton}
      >
        <ArrowLeftIcon/>
        {/* &larr; Back */}
      </button>
      <div className={styles.title}><h1 className="text-2xl">{pathname.split("/").pop()}</h1></div>
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

"use client"
import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import GeetanjaliTagCloud from "../_components/geetanjaliTagcloud";
const LoginPage = () => {
  return (
    <div className="grid grid-cols-2">
    <div className={styles.container}>
      <LoginForm/>
    </div>
     <div className="bg-black flex justify-center items-center">
      <GeetanjaliTagCloud/>
     </div>
    </div>
  );
};

export default LoginPage;

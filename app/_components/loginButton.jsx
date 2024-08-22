// components/LoginButton.jsx
"use client"
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

const LoginButton = () => {
  // const router = useRouter();

  // const handleLoginClick = () => {
  //   router.push('/login');
  // };

  return (
    <>
    <Link href="/login">
    <button
      className="transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
    >login
    </button>
    </Link>
    </>
  );
};

export default LoginButton;

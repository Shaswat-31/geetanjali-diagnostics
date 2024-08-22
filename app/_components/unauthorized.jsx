"use client"
import { FaExclamationTriangle } from 'react-icons/fa';
import { usePathname, useRouter } from "next/navigation";
const Unauthorized=()=> {
    const pathname = usePathname();
  const router = useRouter();

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
      <FaExclamationTriangle className="text-red-500" size={50} />
      <h1 className="text-2xl font-bold mt-4 text-gray-800">Access Denied</h1>
      <p className="text-gray-600 mt-2 text-center">
        You are not authorized to view this page. Please contact your administrator if you believe this is a mistake.
      </p>
      <button
        onClick={handleBack}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Go Back
      </button>
    </div>
  </div>
  )
}

export default Unauthorized

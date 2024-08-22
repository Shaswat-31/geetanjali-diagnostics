import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gray-100">
      <form action={formAction} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl border border-gray-300">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Login</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
        >
          Login
        </button>

        {state && <p className="mt-4 text-center text-red-500 text-sm">{state}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

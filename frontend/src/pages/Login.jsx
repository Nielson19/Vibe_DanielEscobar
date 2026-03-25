// Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBank } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally, add validation here
    if (email) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950">
      {/* Title Bank */}
      <BsBank className="text-yellow-500 mb-4" size={64} />
      <p className="text-gray-200 mb-6 text-center text-5xl font-bold">SimpleBank</p>
      <p className="text-gray-500 mb-6 text-center text-xl">Welcome to your most reliable banking experience</p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm border-2 border-yellow-900"
      >
        {/* Title Form */}
        <div className="flex flex-row justify-center items-center mb-6 gap-3 mt-4">
        <FaLock className="text-yellow-500 mb-4" size={30} />
        <h2 className="mb-1 text-2xl font-bold text-center text-gray-200">Login</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
        >
          Continue
        </button>
      
        {/* Divider with OR */}
        <div className="flex items-center w-full max-w-sm my-6">
          <div className="grow h-px bg-gray-700" />
          <span className="mx-4 text-gray-400 font-semibold">or</span>
          <div className="grow h-px bg-gray-700" />
        </div>
        {/* Register section */}
        <div className="w-full max-w-sm text-center">
          <span className="text-gray-300">If you don't have an account </span>
          <a
            href="/register"
            className="text-yellow-400 hover:underline transition-colors"
          >
            Register
          </a>
      </div>
      </form>
    </div>
  );
}

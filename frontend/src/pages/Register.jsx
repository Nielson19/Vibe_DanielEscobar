import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBank } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally, add validation here
    if (name && email) {
      // Here you would typically send the data to your backend
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950">
      <BsBank className="text-yellow-500 mb-4" size={64} />
      <p className="text-gray-200 mb-6 text-center text-5xl font-bold">SimpleBank</p>
      <p className="text-gray-500 mb-6 text-center text-xl">Create your account to get started</p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm border-2 border-yellow-900"
      >
        <div className="flex flex-row justify-center items-center mb-6 gap-3">
          <FaUserPlus className="text-yellow-500 mb-4" size={30} />
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-200 mt-2">Register</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
            placeholder="Enter your name"
          />
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
          Register
        </button>
      {/* Divider with OR */}
      <div className="flex items-center w-full max-w-sm my-6">
        <div className="grow h-px bg-gray-700" />
        <span className="mx-4 text-gray-400 font-semibold">or</span>
        <div className="grow h-px bg-gray-700" />
      </div>
      {/* Login section */}
      <div className="w-full max-w-sm text-center">
        <span className="text-gray-300">Already have an account? </span>
        <a
          href="/"
          className="font-bold text-yellow-400 hover:underline transition-colors"
        >
          Login
        </a>
      </div>
      </form>
    </div>
  );
}

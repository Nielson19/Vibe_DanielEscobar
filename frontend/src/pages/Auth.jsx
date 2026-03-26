import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBank } from "react-icons/bs";
import { FaLock, FaUserPlus } from "react-icons/fa";
import bgImage from "../assets/bg-image.png";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, login: contextLogin, register: contextRegister } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // avoids refreshing
    setError("");
    setLoading(true);
    try {
      const res = await contextLogin(email, password);
      setLoading(false);
      if (res.data && res.data.user) {
        setUser(res.data.user); // Store user info (including id) in context
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(res.data?.error || "Login failed");
        setError(res.data?.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.error || "Login failed");
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // avoids refreshing
    setError("");
    setLoading(true);
    try {
      const res = await contextRegister(name, email, password);
      setLoading(false);
      if (res.data && res.data.user) {
        setUser(res.data.user); // Store user info (including id) in context
        toast.success("Registration successful");
        navigate("/dashboard");
      } else {
        setError(res.data?.error || "Registration failed");
        toast.error(res.data?.error || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Registration failed");
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950"
    style = {{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <BsBank className="text-yellow-500 mb-4" size={64} />
      <p className="text-gray-200 mb-6 text-center text-5xl font-bold">SimpleBank</p>
      <p className="text-gray-500 mb-6 text-center text-xl">
        {mode === "login"
          ? "Welcome to your most reliable banking experience"
          : "Create your account to get started"}
      </p>
      {mode === "login" ? (
        <form
          onSubmit={handleLogin}
          className="bg-gray-800/40 backdrop-blur-md p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm border-2 border-gray-700"
        >
          <div className="flex flex-row justify-center items-center mb-6 gap-3 mt-4">
            <FaLock className="text-yellow-500 mb-4" size={30} />
            <h2 className="mb-1 text-2xl font-bold text-center text-gray-200">Login</h2>
          </div>
          <div className="mb-4">
            <label htmlFor="login-email" className="block mb-2 font-medium text-gray-300">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
              placeholder="Enter your email"
            />
            <label htmlFor="login-password" className="block font-medium text-gray-300 mt-4">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
              placeholder="Enter your password"
            />  
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
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
            <button
              type="button"
              onClick={() => { setMode("register"); setEmail(""); setName(""); }}
              className="font-bold text-yellow-400 hover:underline transition-colors"
            >
              register
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleRegister}
          className="bg-gray-800/40 backdrop-blur-md p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm border-2 border-gray-700"
        >
          {error && <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>}
          <div className="flex flex-row justify-center items-center mb-6 gap-3 mt-4">
            <FaUserPlus className="text-yellow-500 mb-4" size={30} />
            <h2 className="mb-1 text-2xl font-bold text-center text-gray-200">Register</h2>
          </div>
          <div className="mb-4">
            <label htmlFor="register-name" className="block mb-2 font-medium text-gray-300">
              Name
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="register-email" className="block mb-2 font-medium text-gray-300">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="register-password" className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-opacity duration-200 bg-gray-700 text-gray-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
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
            <button
              type="button"
              onClick={() => { setMode("login"); setEmail(""); setName(""); }}
              className="font-bold text-yellow-400 hover:underline transition-colors"
            >
              login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

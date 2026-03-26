// Navbar.jsx

import MenuButton from "./MenuButton";

export default function Navbar({ userName }) {
  const today = new Date();
  const dateString = today.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  return (
    <div className="flex flex-row justify-between items-center bg-gray-800/40 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-5xl border-2 border-gray-700 md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-col items-start md:items-start">
        <h1 className="text-4xl font-bold text-gray-200 mb-1">👋 Welcome, {userName}!</h1>
        <p className="text-gray-400 text-lg">{dateString}</p>
      </div>
      <MenuButton />
      {/* Add navigation links here if needed */}
    </div>
  );
}

// Dashboard.jsx

import { BsBank } from "react-icons/bs";
import bgImage from "../assets/bg-image.png";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import {getUserById as user} from "../api/accountApi";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth(); // Get the current user from the auth context

  useEffect(() => {
    if (user) {
      const userId = user.user_id; // Replace with actual user ID from auth context or state
      // Assuming getUserById is imported as user (should be renamed for clarity)
      // If you want to use getUserById, import as getUserById and call getUserById(userId)
      // Here, let's assume the import is correct
      // If not, please adjust the import and usage accordingly
      // user(userId) is confusing, so let's clarify:
      import("../api/accountApi").then(api => {
        api.getUserById(userId)
          .then(res => {
            console.log("User account data:", res.data);
            setCurrentUser(res.data.user);
          })
          .catch(err => {
            console.error("Error fetching user account:", err);
          });
      });
    } else {
      console.error("No user found in auth context");
    }
  }, [user]);
  return (
    <div
      className="p-8 flex flex-col justify-start items-center min-h-screen w-screen bg-gray-950 gap-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar userName={currentUser ? currentUser.name : "User"} />
      <Table />
    </div>
  );
}

// Dashboard.jsx

import { BsBank } from "react-icons/bs";
import bgImage from "../assets/bg-image.png";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import {getUserById, getUserById as user} from "../api/accountApi";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth(); // Get the current user from the auth context

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userId = user.user_id; 
        try {
          const res = await getUserById(userId);
          setCurrentUser(res.data.user);
          console.log("Fetched user data:", res.data.user);
          console.log("User ID:", res.data.user.user_id);

        } catch (err) {
          console.error("Error fetching user account:", err);
        }
      } else {
        console.error("No user found in auth context");
      }
    };
    fetchUserData();
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
      {currentUser && <Table userId={currentUser.user_id} />}
    </div>
  );
}

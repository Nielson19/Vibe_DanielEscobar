// Dashboard.jsx
import { BsBank } from "react-icons/bs";
import bgImage from "../assets/bg-image.png";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../api/accountApi";
import SpeedDial from "../components/SpeedDial";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setCurrentUser(null);
        return;
      }

      const userId = user._id || user.user_id;
      setCurrentUser(user);

      if (!userId) {
        return;
      }

      try {
        const res = await getUserById(userId);
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user account:", err);
      }
    };

    fetchUserData();
  }, [user]);

  const currentUserId = currentUser?._id || currentUser?.user_id;

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
      {currentUserId && <Table userId={currentUserId} />}
      {/* <SpeedDial /> */}
    </div>
  );
}

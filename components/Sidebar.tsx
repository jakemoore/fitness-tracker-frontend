'use client'

import Link from "next/link";
import { Home, History, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Fitness Tracker</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/workouts"
            className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 ${pathname === "/workouts" ? "bg-gray-700" : ""}`}
          >
            <Home size={20} />
            <span>Workouts</span>
          </Link>
          <Link
            href="/history"
            className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 ${pathname === "/history" ? "bg-gray-700" : ""}`}
          >
            <History size={20} />
            <span>Workout Logs</span>
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800 hover:bg-gray-700"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;

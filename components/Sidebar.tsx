'use client'

import Link from "next/link";
import { Home, History } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
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
  );
};

export default Sidebar;

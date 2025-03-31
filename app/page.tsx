'use client'

import { useAuthContext } from "@/context/AuthContext";
import { getDashboardStats } from "@/lib/dashboardApi";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { user } = useAuthContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardStats(), // Fetch workouts for the select dropdown
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the Fitness Tracker!
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-260 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Workouts This Week:{" "}
          <span className="text-blue-500 font-bold">{data?.workoutsThisWeek}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700 mt-2">
          Current Streak:{" "}
          <span className="text-green-500 font-bold">{data?.currentStreak} days</span>
        </p>
        {data?.mostFrequentWorkout ? (
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Most Frequent Workout:{" "}
            <span className="text-purple-500 font-bold">
              {data?.mostFrequentWorkout}
            </span>
          </p>
        ) : (
          <p className="text-gray-500 mt-2">No frequent workout yet</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useAuthContext } from "@/context/AuthContext";
import { getWorkoutLogs } from "@/lib/workoutApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";

export default function WorkoutHistory() {
  const [page, setPage] = useState(1);
  const { user } = useAuthContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["workoutLogs", page],
    queryFn: () => getWorkoutLogs(page),
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto p-6 bg-white flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Workout Logs</h2>
      <ul className="flex-1 space-y-4 overflow-y-auto">
        {data?.workoutLogs.map((log: any) => (
          <li className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex items-center gap-x-4 text-gray-900">
              <span className="font-semibold">{log.workoutName}</span>
              {log.weight && (
                <span className="text-gray-900 font-semibold">{log.weight} lbs</span>
              )}
              <span className="text-gray-600">{log.reps} reps × {log.sets} sets</span>
            </div>

            <div className="text-right text-gray-600 row-span-2">
              <p className="font-semibold">{format(new Date(log.dateCompleted), "PP")}</p>
              <p className="text-sm">{format(new Date(log.dateCompleted), "p")}</p>
            </div>

            {log.notes && (
              <p className="text-gray-500 text-sm mt-1">{log.notes}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-300 hover:bg-blue-600 transition"
        >
          Prev
        </button>

        <span className="text-lg font-medium">
          Page {page} of {data?.totalPages}
        </span>

        <button
          onClick={() => setPage((p) => (p < data?.totalPages! ? p + 1 : p))}
          disabled={page === data?.totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-300 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>

  );
}

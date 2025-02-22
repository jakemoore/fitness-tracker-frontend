'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workout`)
      .then((res) => setWorkouts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Workout Tracker</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} className="border p-2 rounded mb-2">
            {workout.name} - {workout.sets} sets x {workout.reps} reps
          </li>
        ))}
      </ul>
    </div>
  );
}

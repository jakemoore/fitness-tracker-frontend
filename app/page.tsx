'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import AddWorkoutForm from "@/src/components/AddWorkoutForm";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const addWorkout = async (workout: any): Promise<boolean> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workout`, workout);
    if (response.status === 201 || response.status === 200) {
      alert("Workout added successfully!");
      loadWorkouts();
      return true;
    } else {
      alert("Error adding workout.");
      return false;
    }
  };

  const loadWorkouts = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workout`)
      .then((res) => setWorkouts(res.data));
  }

  const onDelete = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workout/${id}`);
    if (response.status === 200) {
      alert("Workout deleted successfully!");
      loadWorkouts();
    } else {
      alert("Error deleting workout."); 
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Workout Tracker</h1>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id} className="border p-2 rounded mb-2">
              {workout.name} - {workout.sets} sets x {workout.reps} reps
              <button onClick={() => onDelete(workout.id)} className="text-red-500 font-bold px-2">
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add a Workout</h1>
        <AddWorkoutForm addWorkout={addWorkout} />
      </div>
    </>
  );
}

'use client';

import AddWorkoutForm from "@/components/AddWorkoutForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { addWorkout, deleteWorkout, getWorkouts, Workout } from "@/lib/workoutApi";
import { useEffect, useState } from "react";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const onDelete = async (id: number | undefined) => {
    if (!id) return;
    try {
      await deleteWorkout(id);
      loadWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const onAddWorkout = async (workout: any): Promise<boolean> => {
    try {
      const w = await addWorkout(workout);
      loadWorkouts();
      return true;
    } catch (error) {
      console.error("Error adding workout:", error);
      return false;
    }
  };

  return (
    <ProtectedRoute>
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
        <AddWorkoutForm onAddWorkout={onAddWorkout} />
      </div>
    </ProtectedRoute>
  );

}
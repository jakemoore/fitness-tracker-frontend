'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import AddWorkoutForm from "@/src/components/AddWorkoutForm";
import LoginForm from "@/src/components/LoginForm";
import { addWorkout, deleteWorkout, getWorkouts, Workout } from "@/src/api/workoutApi";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if JWT token is stored in localStorage (user is logged in)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, user is authenticated
    setAuthToken(token);
    if (token) {
      loadWorkouts();
    }
  }, []);

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

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const onDelete = async (id: number | undefined) => {
    if (!id) return;
    try {
      await deleteWorkout(id);
      loadWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const onSignInSuccess = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, user is authenticated
    setAuthToken(token);
    if (token) {
      loadWorkouts();
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm onSignInSuccess={onSignInSuccess} />
      ) : (
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
            <AddWorkoutForm onAddWorkout={onAddWorkout} />
          </div>
        </>
      )}
    </>
  );
}

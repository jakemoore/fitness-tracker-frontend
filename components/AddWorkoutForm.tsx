import { useState } from "react";

export default function AddWorkoutForm({ onAddWorkout }: { onAddWorkout: (workout: any) => Promise<boolean> }) {
  const [workout, setWorkout] = useState({ name: "", sets: "", reps: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await onAddWorkout(workout);
    if (success) {
        setWorkout({ name: "", sets: "", reps: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input type="text" name="name" value={workout.name} onChange={handleChange} placeholder="Workout Name" required className="border p-2" />
      <input type="text" name="sets" value={workout.sets} onChange={handleChange} placeholder="Number of Sets" required className="border p-2 w-full" />
      <input type="text" name="reps" value={workout.reps} onChange={handleChange} placeholder="Number of Reps" required className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Workout</button>
    </form>
  );
}

"use client";

import { useAuthContext } from "@/context/AuthContext";
import { addWorkoutLog, getWorkoutLogs, getWorkouts } from "@/lib/workoutApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function WorkoutHistory() {
  const [page, setPage] = useState(1);
  const { user } = useAuthContext();
  const [workoutId, setWorkoutId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    await addLog({
      workoutId,
      weight: weight.length ? Number(weight) : undefined,
      reps: Number(reps),
      sets: Number(sets),
      notes: notes.length ? notes : undefined,
    });
    setDialogOpen(false);
    setWorkoutId("");
  };

  const { mutate: addLog } = useMutation({
    mutationFn: addWorkoutLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["workoutLogs", page],
    queryFn: () => getWorkoutLogs(page),
    enabled: !!user,
  });

  const { data: workouts, error: workoutsError, isLoading: workoutsLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => getWorkouts(), // Fetch workouts for the select dropdown
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto p-6 bg-white flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Workout Logs</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              <CalendarPlus className="w-5 h-5" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Workout Log</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Workout Name</label>
                <Select onValueChange={setWorkoutId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workout" />
                  </SelectTrigger>
                  <SelectContent>
                    {workouts && workouts.map((w) => (
                      <SelectItem key={w.id} value={w.id.toString()}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (optional)</label>
                <Input type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reps</label>
                <Input type="number" placeholder="Enter reps" value={reps} onChange={(e) => setReps(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sets</label>
                <Input type="number" placeholder="Enter sets" value={sets} onChange={(e) => setSets(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                <Input placeholder="Add notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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

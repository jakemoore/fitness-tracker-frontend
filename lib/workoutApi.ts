import api from '@/lib/axios';

export interface Workout {
  id: number;
  name: string;
  sets: number;
  reps: number;
}

export interface WorkoutLog {
  id: number;
  workoutName: string;
  dateCompleted: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface WorkoutLogDto {
  workoutId: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface WorkoutLogs {
  workoutLogs: WorkoutLog[];
  totalLogs: number;
  totalPages: number;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/workouts`;

// Fetch all workouts
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await api.get<Workout[]>(API_BASE_URL);
  return response.data;
};

// Add a new workout
export const addWorkout = async (workout: Workout): Promise<Workout> => {
  const response = await api.post<Workout>(API_BASE_URL, workout);
  return response.data;
};

// Delete a workout by ID
export const deleteWorkout = async (id: number): Promise<void> => {
  await api.delete(`${API_BASE_URL}/${id}`);
};

// Fetch workout logs
export const getWorkoutLogs = async (page: number): Promise<WorkoutLogs> => {
  const response = await api.get<WorkoutLogs>(`${API_BASE_URL}/logs?page=${page}&pageSize=10`);
  return response.data;
};

// Add a new workout log
export const addWorkoutLog = async (workoutLog: WorkoutLogDto): Promise<WorkoutLog> => {
  const response = await api.post<WorkoutLog>(`${API_BASE_URL}/logs`, workoutLog);
  return response.data;
};

import axios from "axios";

// Define the Workout type (adjust fields as needed)
export interface Workout {
  id?: number;
  name: string;
  sets: number;
  reps: number;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/workout`;

// Function to get the Firebase auth token from localStorage
const getAuthTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

// Axios instance with auth headers
const axiosInstance = axios.create();

// Add the Authorization header with the Firebase token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fetch all workouts
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await axiosInstance.get<Workout[]>(API_BASE_URL);
  return response.data;
};

// Add a new workout
export const addWorkout = async (workout: Workout): Promise<Workout> => {
  const response = await axiosInstance.post<Workout>(API_BASE_URL, workout);
  return response.data;
};

// Delete a workout by ID
export const deleteWorkout = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${API_BASE_URL}/${id}`);
};

import axios from "axios";
import { getAuth } from "firebase/auth";

// Define the Workout type (adjust fields as needed)
export interface Workout {
  id?: number;
  name: string;
  sets: number;
  reps: number;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/workouts`;

// Function to get the Firebase auth token from localStorage
const getAuthTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

// Axios instance with auth headers
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // Always fetch fresh token
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized request. Attempting to refresh token...');
      const auth = getAuth();
      await auth.currentUser?.getIdToken(true); // Force refresh token
    }
    return Promise.reject(error);
  }
);

// Add the Authorization header with the Firebase token from localStorage
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

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

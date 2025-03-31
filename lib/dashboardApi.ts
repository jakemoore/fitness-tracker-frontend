import api from '@/lib/axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`;

export interface DashboardStats {
  workoutsThisWeek: number;
  currentStreak: number;
  mostFrequentWorkout: string | null;
}

// Fetch dashboard stats 
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<DashboardStats>(`${API_BASE_URL}/stats`);
  return response.data;
};

import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create();

api.interceptors.request.use(async (config) => {
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

api.interceptors.response.use(
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

export default api;

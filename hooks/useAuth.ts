"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Import your Firebase instance
import { onAuthStateChanged, User, getIdToken, signOut } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null; // Store interval ID for cleanup
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser ? "Logged in" : "Logged out");

      if (firebaseUser) {
        setUser(firebaseUser);

        // Refresh token every 55 minutes (before expiration)
        refreshInterval = setInterval(async () => {
          try {
            await firebaseUser.getIdToken(true);
            console.log("Firebase token refreshed");
          } catch (error) {
            console.error("Error refreshing token:", error);
          }
        }, 55 * 60 * 1000); // 55 minutes
      } else {
        setUser(null);
      }

      console.log('calling setLoading(false) in useAuth');
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (refreshInterval) clearInterval(refreshInterval); // Cleanup token refresh interval
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, loading, logout };
}

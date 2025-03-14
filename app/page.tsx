'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/workouts"); // Redirect to Workouts
  }, [router]);

  return null; // No UI needed
}

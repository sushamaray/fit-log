"use client";

import { useFitLog } from "@/context/FitLogContext";

export default function Home() {
  const {
    plan,
    saved,
    completed,
  } = useFitLog();

  return (
    <main>
      <h1>FitLog</h1>

      <p>Plan: {plan.length}</p>
      <p>Saved: {saved.length}</p>
      <p>Completed: {completed.length}</p>
    </main>
  );
}
"use client";

import { Bookmark, Plus } from "lucide-react";
import { toast } from "react-toastify";
import type { Workout } from "@/lib/api";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  const alreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  const planIsFull = plan.length >= 5;

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      toast.info("Already in today's plan");
      return;
    }

    if (planIsFull) {
      toast.info("Today's plan is full");
      return;
    }

    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    saveWorkout(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planIsFull || alreadyInPlan}
        className="inline-flex flex-1 items-center justify-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#d9ff4d] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={18} strokeWidth={2.5} />

        {alreadyInPlan
          ? "Added to Plan"
          : planIsFull
            ? "Plan Full"
            : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={alreadySaved}
        className="inline-flex flex-1 items-center justify-center gap-2 border border-white/20 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Bookmark size={18} />

        {alreadySaved
          ? "Saved"
          : "Save for later"}
      </button>
    </div>
  );
}
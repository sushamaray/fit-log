"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getWorkouts, type Workout } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);

        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Unable to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-white/45 sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative">
          <label
            htmlFor="sort"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="appearance-none border border-white/15 bg-[#111111] py-3 pl-4 pr-11 text-xs font-bold uppercase tracking-wider text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid min-h-[300px] place-items-center">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/50">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ccff00]" />
            Loading workouts…
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="py-20 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}
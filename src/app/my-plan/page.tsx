"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Check,
  Clock3,
  Flame,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    completed,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  const totalDuration = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const completedCount = plan.filter((workout) =>
    completed.includes(workout.id),
  ).length;

  const handleComplete = (id: number, name: string) => {
    markAsDone(id);
    toast.success(`${name} marked as done`);
  };

  const handleRemoveFromPlan = (id: number, name: string) => {
    removeFromPlan(id);
    toast.success(`${name} removed from today's plan`);
  };

  const handleRemoveSaved = (id: number, name: string) => {
    removeSaved(id);
    toast.success(`${name} removed from saved workouts`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          {/* Header */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              YOUR WORKOUTS
            </p>

            <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
              MY PLAN.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/50">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </section>

          {/* Metrics */}
          <section className="mt-12 grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-3">
            <Metric
              label="Exercises"
              value={String(plan.length)}
            />

            <Metric
              label="Minutes"
              value={`${totalDuration} min`}
            />

            <Metric
              label="Calories"
              value={`${totalCalories} kcal`}
            />
          </section>

          {/* Progress */}
          {plan.length > 0 && (
            <section className="mt-8 border border-white/10 bg-[#111111] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                    TODAY&apos;S PROGRESS
                  </p>

                  <p className="mt-2 text-lg font-black uppercase">
                    {completedCount} / {plan.length} completed
                  </p>
                </div>

                <div className="text-2xl font-black text-[#ccff00]">
                  {Math.round((completedCount / plan.length) * 100)}%
                </div>
              </div>

              <div className="mt-4 h-2 w-full bg-white/10">
                <div
                  className="h-full bg-[#ccff00] transition-all duration-300"
                  style={{
                    width: `${(completedCount / plan.length) * 100}%`,
                  }}
                />
              </div>
            </section>
          )}

          {/* Tabs */}
          <section className="mt-14">
            <div className="flex border-b border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`border-b-2 px-5 py-4 text-sm font-black uppercase tracking-wider transition ${
                  activeTab === "plan"
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                Today&apos;s Plan
                <span className="ml-2">{plan.length}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`border-b-2 px-5 py-4 text-sm font-black uppercase tracking-wider transition ${
                  activeTab === "saved"
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                Saved
                <span className="ml-2">{saved.length}</span>
              </button>
            </div>
          </section>

          {/* Tab Content */}
          <section className="mt-8">
            {isLoading ? (
              <LoadingState />
            ) : activeTab === "plan" ? (
              <PlanSection
                plan={plan}
                completed={completed}
                onRemove={handleRemoveFromPlan}
                onComplete={handleComplete}
              />
            ) : (
              <SavedSection
                saved={saved}
                onRemove={handleRemoveSaved}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------------------------- */
/* Loading                            */
/* ---------------------------------- */

function LoadingState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center border border-white/10 bg-[#111111]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#ccff00]" />

      <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
        Loading workouts…
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Metrics                            */
/* ---------------------------------- */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-white/10 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-white sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Today's Plan                       */
/* ---------------------------------- */

function PlanSection({
  plan,
  completed,
  onRemove,
  onComplete,
}: {
  plan: ReturnType<typeof useFitLog>["plan"];
  completed: ReturnType<typeof useFitLog>["completed"];
  onRemove: (id: number, name: string) => void;
  onComplete: (id: number, name: string) => void;
}) {
  if (plan.length === 0) {
    return (
      <EmptyState
        title="NOTHING HERE YET"
        description="Browse the library and add a lift to get today moving."
        buttonText="Go to workouts"
        href="/"
      />
    );
  }

  return (
    <div className="space-y-4">
      {plan.map((workout, index) => {
        const isCompleted = completed.includes(workout.id);

        return (
          <div
            key={workout.id}
            className={`group border border-white/10 bg-[#111111] transition ${
              isCompleted
                ? "opacity-60"
                : "hover:border-white/20"
            }`}
          >
            <div className="grid lg:grid-cols-[220px_1fr_auto]">
              {/* Image */}
              <Link
                href={`/workout/${workout.id}`}
                className="relative block h-52 overflow-hidden lg:h-full"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className={`object-cover transition duration-500 group-hover:scale-105 ${
                    isCompleted ? "grayscale" : ""
                  }`}
                  sizes="(max-width: 1024px) 100vw, 220px"
                />

                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ccff00] text-black">
                      <Check size={24} strokeWidth={3} />
                    </div>
                  </div>
                )}
              </Link>

              {/* Information */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-sm font-black text-[#ccff00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="text-xl font-black uppercase transition hover:text-[#ccff00] sm:text-2xl"
                    >
                      {workout.name}
                    </Link>

                    <p className="mt-2 text-sm text-white/40">
                      {workout.equipment}
                    </p>
                  </div>
                </div>

                {/* Muscle Groups */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} />
                    {workout.duration} min
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Flame size={15} />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Star size={15} />
                    {workout.rating}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 border-t border-white/10 p-4 lg:w-52 lg:border-l lg:border-t-0 lg:p-5">
                {/* View Details */}
                <Link
                  href={`/workout/${workout.id}`}
                  className="flex items-center justify-center border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-wider text-white/70 transition hover:border-[#ccff00] hover:text-[#ccff00]"
                >
                  View Details
                </Link>

                {/* Mark as Done */}
                <button
                  type="button"
                  onClick={() => onComplete(workout.id, workout.name)}
                  disabled={isCompleted}
                  className={`flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition ${
                    isCompleted
                      ? "cursor-not-allowed bg-white/10 text-white/30"
                      : "bg-[#ccff00] text-black hover:bg-[#d9ff4d]"
                  }`}
                >
                  <Check size={15} strokeWidth={2.5} />

                  {isCompleted ? "Completed" : "Mark as Done"}
                </button>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => onRemove(workout.id, workout.name)}
                  className="flex items-center justify-center gap-2 border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 transition hover:border-red-400 hover:text-red-400"
                >
                  <Trash2 size={15} />

                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- */
/* Saved Workouts                     */
/* ---------------------------------- */

function SavedSection({
  saved,
  onRemove,
}: {
  saved: ReturnType<typeof useFitLog>["saved"];
  onRemove: (id: number, name: string) => void;
}) {
  if (saved.length === 0) {
    return (
      <EmptyState
        title="NOTHING HERE YET"
        description="Browse the library and save a lift to keep it here for later."
        buttonText="Go to workouts"
        href="/"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((workout) => (
        <article
          key={workout.id}
          className="group overflow-hidden border border-white/10 bg-[#111111]"
        >
          {/* Image */}
          <Link
            href={`/workout/${workout.id}`}
            className="relative block aspect-[4/3] overflow-hidden"
          >
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ccff00]">
              <Bookmark size={12} />
              Saved
            </div>
          </Link>

          {/* Content */}
          <div className="p-5">
            <Link
              href={`/workout/${workout.id}`}
              className="text-lg font-black uppercase transition hover:text-[#ccff00]"
            >
              {workout.name}
            </Link>

            <p className="mt-2 text-sm text-white/40">
              {workout.equipment}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-4 text-xs text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={13} />
                  {workout.duration} min
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Flame size={13} />
                  {workout.caloriesBurned} kcal
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Star size={13} />
                  {workout.rating}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onRemove(workout.id, workout.name)}
                className="ml-3 shrink-0 text-white/40 transition hover:text-red-400"
                aria-label={`Remove ${workout.name} from saved workouts`}
                title="Remove from saved"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------- */
/* Empty State                        */
/* ---------------------------------- */

function EmptyState({
  title,
  description,
  buttonText,
  href,
}: {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}) {
  return (
    <div className="border border-dashed border-white/15 bg-[#0f0f0f] px-6 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
        NOTHING HERE YET
      </p>

      <h2 className="mt-4 text-3xl font-black uppercase">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
        {description}
      </p>

      <Link
        href={href}
        className="mt-8 inline-flex bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#d9ff4d]"
      >
        {buttonText}
      </Link>
    </div>
  );
}
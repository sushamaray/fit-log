"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Trash2, Bookmark } from "lucide-react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
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
              Build your training queue, keep your saved workouts close,
              and track what you have completed.
            </p>
          </section>

          {/* Metrics */}
          <section className="mt-12 grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-3">
            <Metric
              label="Exercises"
              value={String(plan.length)}
            />

            <Metric
              label="Total Duration"
              value={`${totalDuration} min`}
            />

            <Metric
              label="Total Calories"
              value={`${totalCalories} kcal`}
            />
          </section>

          {/* Progress */}
          {plan.length > 0 && (
            <section className="mt-8 border border-white/10 bg-[#111111] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                    TODAY'S PROGRESS
                  </p>

                  <p className="mt-2 text-lg font-black uppercase">
                    {completedCount} / {plan.length} completed
                  </p>
                </div>

                <div className="text-2xl font-black text-[#ccff00]">
                  {Math.round(
                    (completedCount / plan.length) * 100,
                  )}
                  %
                </div>
              </div>

              <div className="mt-4 h-2 w-full bg-white/10">
                <div
                  className="h-full bg-[#ccff00] transition-all duration-300"
                  style={{
                    width: `${
                      (completedCount / plan.length) * 100
                    }%`,
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
                Today's Plan
                <span className="ml-2">
                  {plan.length}
                </span>
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
                <span className="ml-2">
                  {saved.length}
                </span>
              </button>
            </div>
          </section>

          {/* Tab Content */}
          <section className="mt-8">
            {activeTab === "plan" ? (
              <PlanSection
                plan={plan}
                completed={completed}
                onRemove={removeFromPlan}
                onComplete={markAsDone}
              />
            ) : (
              <SavedSection
                saved={saved}
                onRemove={removeSaved}
              />
            )}
          </section>
        </div>
      </main>
    </>
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
  onRemove: (id: number) => void;
  onComplete: (id: number) => void;
}) {
  if (plan.length === 0) {
    return (
      <EmptyState
        title="Your plan is empty."
        description="Browse the workout library and add exercises to build today's training plan."
        buttonText="Browse workouts"
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

                  <div>
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

                  <span>
                    {workout.sets} sets × {workout.reps}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row gap-2 border-t border-white/10 p-4 lg:w-48 lg:flex-col lg:border-l lg:border-t-0 lg:p-5">
                <button
                  type="button"
                  onClick={() => onComplete(workout.id)}
                  disabled={isCompleted}
                  className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition ${
                    isCompleted
                      ? "cursor-not-allowed bg-white/10 text-white/30"
                      : "bg-[#ccff00] text-black hover:bg-[#d9ff4d]"
                  }`}
                >
                  <Check size={15} />

                  {isCompleted ? "Completed" : "Mark as Done"}
                </button>

                <button
                  type="button"
                  onClick={() => onRemove(workout.id)}
                  className="flex flex-1 items-center justify-center gap-2 border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-wider text-white/60 transition hover:border-red-400 hover:text-red-400"
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
  onRemove: (id: number) => void;
}) {
  if (saved.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet."
        description="Save workouts from their details page and they will appear here."
        buttonText="Browse workouts"
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
              <div className="flex gap-4 text-xs text-white/40">
                <span>{workout.duration} min</span>
                <span>{workout.caloriesBurned} kcal</span>
              </div>

              <button
                type="button"
                onClick={() => onRemove(workout.id)}
                className="text-white/40 transition hover:text-red-400"
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
        NOTHING HERE
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
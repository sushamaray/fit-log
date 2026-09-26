import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Dumbbell } from "lucide-react";

import { getWorkout } from "@/lib/api";
import Navbar from "@/components/Navbar";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#0b0b0b] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 transition hover:text-[#ccff00]"
            >
              <ArrowLeft size={16} />
              Back to workouts
            </Link>

            <div className="mt-20">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                ERROR
              </p>

              <h1 className="mt-3 text-4xl font-black uppercase">
                Workout not found
              </h1>

              <p className="mt-4 max-w-lg text-white/50">
                We could not find a workout with this ID.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          {/* Back Button */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 transition hover:text-[#ccff00]"
          >
            <ArrowLeft size={16} />
            Back to workouts
          </Link>

          {/* Main Layout */}
          <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Workout Image */}
            <div className="relative h-[500px] min-w-0 overflow-hidden bg-[#151515] lg:sticky lg:top-8 lg:h-[650px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Muscle Group Tags */}
              <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Workout Information */}
            <div className="min-w-0">
              {/* Eyebrow */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                WORKOUT DETAILS
              </p>

              {/* Title */}
              <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                {workout.name}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/55">
                {workout.description}
              </p>

              {/* Muscle Groups */}
              <div className="mt-6 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-black uppercase text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Key Specs */}
              <div className="mt-10">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Dumbbell
                    size={18}
                    className="text-[#ccff00]"
                  />

                  <h2 className="text-sm font-black uppercase tracking-[0.15em]">
                    KEY SPECS
                  </h2>
                </div>

                <div className="mt-5 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3">
                  <Spec
                    label="Equipment"
                    value={workout.equipment}
                  />

                  <Spec
                    label="Difficulty"
                    value={workout.difficulty}
                  />

                  <Spec
                    label="Sets"
                    value={String(workout.sets)}
                  />

                  <Spec
                    label="Reps"
                    value={workout.reps}
                  />

                  <Spec
                    label="Duration"
                    value={`${workout.duration} min`}
                  />

                  <Spec
                    label="Calories"
                    value={`${workout.caloriesBurned} kcal`}
                  />

                  <Spec
                    label="Rating"
                    value={String(workout.rating)}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-10">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Check
                    size={18}
                    className="text-[#ccff00]"
                  />

                  <h2 className="text-sm font-black uppercase tracking-[0.15em]">
                    INSTRUCTIONS
                  </h2>
                </div>

                <ol className="mt-5 space-y-5">
                  {workout.instructions.map(
                    (instruction, index) => (
                      <li
                        key={instruction}
                        className="flex gap-4 border-b border-white/5 pb-5"
                      >
                        <span className="text-sm font-black text-[#ccff00]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm leading-6 text-white/60">
                          {instruction}
                        </p>
                      </li>
                    ),
                  )}
                </ol>
              </div>

              {/* Action Buttons */}
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-white/10 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}
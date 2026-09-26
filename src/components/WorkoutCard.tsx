import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  ArrowUpRight,
} from "lucide-react";
import type { Workout } from "@/lib/api";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
            >
              {muscle}
            </span>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ccff00] text-black opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black uppercase tracking-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/55">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={14} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
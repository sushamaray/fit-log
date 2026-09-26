"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-white/10 bg-[#111111]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            priority
          />

          <span className="text-lg font-bold tracking-[0.18em] text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`relative py-2 text-sm font-semibold uppercase tracking-[0.12em] transition ${
              isWorkoutActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workout

            {isWorkoutActive && (
              <span className="absolute -bottom-[19px] left-0 h-[2px] w-full bg-[#ccff00]" />
            )}
          </Link>

          <Link
            href="/my-plan"
            className={`relative py-2 text-sm font-semibold uppercase tracking-[0.12em] transition ${
              isPlanActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Plan

            {isPlanActive && (
              <span className="absolute -bottom-[19px] left-0 h-[2px] w-full bg-[#ccff00]" />
            )}
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#d8ff4d]"
          >
            <span>Plan</span>
            <span>{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="border-t border-white/5 px-5 py-3 md:hidden">
        <div className="flex items-center justify-center gap-8">
          <Link
            href="/"
            className={`text-xs font-bold uppercase tracking-widest ${
              isWorkoutActive
                ? "text-[#ccff00]"
                : "text-white/50"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-xs font-bold uppercase tracking-widest ${
              isPlanActive
                ? "text-[#ccff00]"
                : "text-white/50"
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-80px)] bg-[#0b0b0b] text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="w-full max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ccff00] text-black">
              <Dumbbell size={28} strokeWidth={2.5} />
            </div>

            <p className="mt-8 text-sm font-black uppercase tracking-[0.25em] text-[#ccff00]">
              404 — PAGE NOT FOUND
            </p>

            <h1 className="mt-4 text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">
              WRONG TURN.
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-white/50">
              This page does not exist. Head back to the workout library and
              find something worth logging.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#d9ff4d]"
            >
              <ArrowLeft size={17} strokeWidth={2.5} />
              Back to workouts
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
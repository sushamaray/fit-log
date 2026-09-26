import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0b0b]">
        <Hero />
        <WorkoutLibrary />
      </main>
    </>
  );
}
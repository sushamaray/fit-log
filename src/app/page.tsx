import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0b0b]">
        <Hero />

        <section
          id="library"
          className="mx-auto min-h-[400px] max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-white">
            THE LIBRARY
          </h2>
        </section>
      </main>
    </>
  );
}
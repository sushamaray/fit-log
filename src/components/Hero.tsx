import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-20">
        
        {/* Left Content */}
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="#library"
            className="mt-9 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-[#d9ff4d]"
          >
            BROWSE WORKOUTS
            <ArrowDownRight size={18} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative flex h-[400px] items-center justify-center lg:h-[560px]">
          <div className="absolute h-[320px] w-[320px] rounded-full bg-[#ccff00]/5 blur-3xl" />

          <Image
            src="/assets/banner.png"
            alt="Workout illustration"
            width={500}
            height={500}
            priority
            className="relative z-10 h-auto w-[300px] object-contain sm:w-[360px] lg:w-[430px]"
          />
        </div>

      </div>
    </section>
  );
}
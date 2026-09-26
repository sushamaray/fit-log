import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="FitLog home"
        >
          <div className="relative h-8 w-8 overflow-hidden">
            <Image
              src="/logo.png"
              alt="FitLog logo"
              fill
              className="object-contain"
            />
          </div>

          <span className="text-lg font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs font-medium text-white/35 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
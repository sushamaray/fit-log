import type { Metadata } from "next";

import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}

          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={2500}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}
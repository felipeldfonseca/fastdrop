"use client";

import LandingNavbar from "@/components/navbar/LandingNavbar";
import Footer from "@/components/landing/Footer";

export default function LandingPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--brand-bg] text-[--brand-fg] flex flex-col">
      <LandingNavbar />
      <main className="mx-auto max-w-6xl px-6 flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 
import LandingNavbar from "@/components/navbar/LandingNavbar";
import Footer from "@/components/landing/Footer";
import "./landing.css";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[--brand-bg] text-[--brand-fg]">
      <LandingNavbar />
      <main className="mx-auto max-w-6xl px-6">{children}</main>
      <Footer />
    </div>
  );
} 
import Footer from "@/components/landing/Footer";
import LandingNavbar from "@/components/navbar/LandingNavbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--brand-bg] text-[--brand-fg] flex flex-col">
      <LandingNavbar />
      <main className="py-8 pt-24 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
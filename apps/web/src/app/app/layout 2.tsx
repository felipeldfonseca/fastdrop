import AppNavbar from "@/components/navbar/AppNavbar";
import Footer from "@/components/landing/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--brand-bg] text-[--brand-fg]">
      <AppNavbar />
      <main className="py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
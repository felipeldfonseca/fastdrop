import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "@/styles/landing.css";

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Fast Drop",
  description: "Sell your airdrops before everyone else.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${sora.variable}`}>
<<<<<<< HEAD
        <div className="bg-[--brand-bg] text-[--brand-fg]">
          <LandingNavbar />
          <main className="mx-auto max-w-6xl px-6">{children}</main>
          <Footer />
        </div>
=======
        {children}
>>>>>>> main
      </body>
    </html>
  );
} 
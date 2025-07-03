export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--brand-bg] text-[--brand-fg]">
      <main className="py-8 pt-24">
        {children}
      </main>
    </div>
  );
} 
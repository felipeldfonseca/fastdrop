import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-12 text-xs text-[--brand-muted]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <span>© 2025 Fast Drop.</span>
          <span>Solana ≠ financial advice.</span>
          <span>MIT License.</span>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-[--brand-fg]">
            Twitter
          </Link>
          <Link href="#" className="hover:text-[--brand-fg]">
            Discord
          </Link>
          <Link href="#" className="hover:text-[--brand-fg]">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
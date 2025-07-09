import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-12 text-xs text-[--brand-muted]">
      <div className="flex flex-col items-center gap-4">
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
        <span>© 2025 Fast Drop</span>
      </div>
    </footer>
  );
};

export default Footer; 
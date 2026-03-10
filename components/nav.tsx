import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wide"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          BUYLOW
        </Link>
        <button className="rounded-lg border border-dark-border px-4 py-2 text-xs text-dark-muted transition-colors hover:border-white hover:text-white">
          Log in
        </button>
      </div>
    </nav>
  );
}

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          buylow
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="#premium"
            className="text-sm text-dark-muted transition-colors hover:text-white"
          >
            Content
          </Link>
          <Link
            href="/blog"
            className="text-sm text-dark-muted transition-colors hover:text-white"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}

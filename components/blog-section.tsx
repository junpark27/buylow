import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h2 className="text-2xl font-extrabold">무료 콘텐츠</h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-dark-muted transition-colors hover:text-gold"
        >
          전체 보기 →
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-dark-border bg-dark-card p-5 transition-colors hover:border-gold/30"
          >
            <div className="mb-1 flex items-center gap-3">
              <time className="text-xs text-dark-muted">{post.date}</time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-gold/10 px-2 py-0.5 text-xs text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-bold">{post.title}</h3>
            <p className="mt-1 text-sm text-dark-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

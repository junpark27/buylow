import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — buylow",
  description: "무료 크립토 인사이트, 시황 코멘트, 에어드랍 가이드",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Blog
        </p>
        <h1 className="mb-8 text-3xl font-extrabold">무료 콘텐츠</h1>

        {posts.length === 0 ? (
          <p className="text-dark-muted">아직 글이 없습니다.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-gold/30"
              >
                <div className="mb-2 flex items-center gap-3">
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
                <h2 className="mb-1 text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-dark-muted">{post.description}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function BlogPage() {
  const { user, authenticated } = usePrivy();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  useEffect(() => {
    async function load() {
      const headers: Record<string, string> = {};
      if (userId) headers["x-user-id"] = userId;

      const res = await fetch("/api/posts", { headers });
      if (res.ok) {
        setPosts(await res.json());
      }

      if (userId) {
        const adminRes = await fetch("/api/admin", { headers });
        if (adminRes.ok) {
          const data = await adminRes.json();
          setIsAdmin(data.isAdmin);
        }
      }

      setLoading(false);
    }
    load();
  }, [userId]);

  async function deletePost(slug: string) {
    if (!confirm("이 글을 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
      headers: { "x-user-id": userId! },
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="text-3xl font-extrabold">무료 콘텐츠</h1>
        </div>
        {isAdmin && (
          <Link
            href="/blog/editor"
            className="rounded-lg bg-gold px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-gold-light"
          >
            + 새 글 작성
          </Link>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-dark-card" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-dark-muted">아직 글이 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug} className="group relative">
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-gold/30"
              >
                <div className="mb-2 flex items-center gap-3">
                  <time className="text-xs text-dark-muted">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </time>
                  {!post.published && (
                    <span className="rounded bg-dark-border px-2 py-0.5 text-xs text-dark-muted">
                      비공개
                    </span>
                  )}
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
              {isAdmin && (
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link
                    href={`/blog/editor/${post.slug}`}
                    className="rounded bg-dark-border px-2 py-1 text-xs text-dark-muted hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    수정
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deletePost(post.slug);
                    }}
                    className="rounded bg-dark-border px-2 py-1 text-xs text-dark-muted hover:text-red-400"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

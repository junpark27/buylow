"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content?: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

function estimateReadingTime(content?: string): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const { user, authenticated } = usePrivy();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

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

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const [featuredPost, ...restPosts] = filteredPosts;

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="text-3xl font-extrabold">무료 콘텐츠</h1>
          <p className="mt-2 text-sm text-dark-muted">
            크립토 투자에 대한 인사이트와 분석을 공유합니다.
          </p>
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

      {/* Tag filter chips */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTag === null
                ? "bg-gold text-black"
                : "border border-dark-border bg-dark-card text-dark-muted hover:border-gold/30 hover:text-white"
            }`}
          >
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTag === tag
                  ? "bg-gold text-black"
                  : "border border-dark-border bg-dark-card text-dark-muted hover:border-gold/30 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          <div className="h-52 animate-pulse rounded-2xl bg-dark-card" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-dark-card" />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-dark-card">
            <svg
              className="h-12 w-12 text-dark-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">아직 글이 없습니다</h3>
          <p className="text-sm text-dark-muted">
            {activeTag
              ? `"${activeTag}" 태그에 해당하는 글이 없습니다.`
              : "곧 유용한 콘텐츠로 찾아뵙겠습니다."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured / Latest post */}
          {featuredPost && (
            <div className="group relative">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block overflow-hidden rounded-2xl border border-dark-border bg-dark-card transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]"
              >
                <div className="p-8">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                      Latest
                    </span>
                    {!featuredPost.published && (
                      <span className="rounded bg-dark-border px-2 py-0.5 text-xs text-dark-muted">
                        비공개
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 mt-3 text-2xl font-bold transition-colors group-hover:text-gold">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-dark-muted line-clamp-2">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <time className="text-xs text-dark-muted">
                      {new Date(featuredPost.created_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-xs text-dark-muted">
                      {estimateReadingTime(featuredPost.content)}분 소요
                    </span>
                    <div className="flex gap-2">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-gold/10 px-2 py-0.5 text-xs text-gold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              {isAdmin && (
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link
                    href={`/blog/editor/${featuredPost.slug}`}
                    className="rounded bg-dark-border px-2 py-1 text-xs text-dark-muted hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    수정
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deletePost(featuredPost.slug);
                    }}
                    className="rounded bg-dark-border px-2 py-1 text-xs text-dark-muted hover:text-red-400"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Rest of posts */}
          {restPosts.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {restPosts.map((post) => (
                <div key={post.slug} className="group relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full rounded-xl border border-dark-border bg-dark-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <time className="text-xs text-dark-muted">
                        {new Date(post.created_at).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="text-xs text-dark-muted">
                        {estimateReadingTime(post.content)}분
                      </span>
                      {!post.published && (
                        <span className="rounded bg-dark-border px-2 py-0.5 text-xs text-dark-muted">
                          비공개
                        </span>
                      )}
                    </div>
                    <h2 className="mb-2 text-base font-bold transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    <p className="mb-3 text-sm leading-relaxed text-dark-muted line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-gold/10 px-2 py-0.5 text-[11px] text-gold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  {isAdmin && (
                    <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
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
        </div>
      )}
    </main>
  );
}

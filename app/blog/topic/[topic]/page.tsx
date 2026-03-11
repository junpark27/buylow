"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { BLOG_TOPICS } from "@/lib/constants";

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published: boolean;
  created_at: string;
}

export default function TopicPage() {
  const params = useParams();
  const topicSlug = params.topic as string;
  const topic = BLOG_TOPICS.find((t) => t.slug === topicSlug);

  const { user } = usePrivy();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  useEffect(() => {
    async function load() {
      const headers: Record<string, string> = {};
      if (userId) headers["x-user-id"] = userId;

      const res = await fetch("/api/posts", { headers });
      if (res.ok) {
        const allPosts: Post[] = await res.json();
        // Filter by topic tag
        const topicLabel = topic?.label || topicSlug;
        setPosts(
          allPosts.filter((p) =>
            p.tags.some(
              (tag) =>
                tag.toLowerCase() === topicSlug.toLowerCase() ||
                tag === topicLabel
            )
          )
        );
      }
      setLoading(false);
    }
    load();
  }, [userId, topicSlug, topic?.label]);

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <p className="text-dark-muted">존재하지 않는 토픽입니다.</p>
        <Link href="/blog" className="mt-4 inline-block text-sm text-gold hover:underline">
          ← 블로그로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <div className="mb-8">
        <Link
          href="/blog"
          className="mb-4 inline-block text-sm text-dark-muted hover:text-gold"
        >
          ← 전체 글
        </Link>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Topic
        </p>
        <h1 className="text-3xl font-extrabold">{topic.label}</h1>
        <p className="mt-2 text-sm text-dark-muted">{topic.description}</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-dark-card" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dark-border bg-dark-card p-12 text-center">
          <p className="text-dark-muted">
            아직 &apos;{topic.label}&apos; 글이 없습니다.
          </p>
          <p className="mt-2 text-xs text-dark-muted/60">
            곧 새로운 콘텐츠가 업로드됩니다.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-gold/30"
            >
              <div className="mb-2 flex items-center gap-3">
                <time className="text-xs text-dark-muted">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </time>
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
  );
}

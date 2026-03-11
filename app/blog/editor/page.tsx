"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const { user, authenticated, ready } = usePrivy();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const userId = user?.id;

  useEffect(() => {
    if (!ready) return;
    if (!authenticated) {
      router.push("/");
      return;
    }
    async function checkAdmin() {
      const res = await fetch("/api/admin", {
        headers: { "x-user-id": userId! },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) router.push("/");
      }
      setChecking(false);
    }
    checkAdmin();
  }, [ready, authenticated, userId, router]);

  // Auto-generate slug from title
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setSlug(generated);
  }, [title]);

  async function handleSave() {
    setError("");
    if (!title || !slug) {
      setError("제목과 슬러그는 필수입니다.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId!,
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          published,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "저장 실패");
      } else {
        router.push("/blog");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  if (!ready || checking) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <div className="h-8 w-32 animate-pulse rounded bg-dark-card" />
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">새 글 작성</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="rounded-lg border border-dark-border px-3 py-1.5 text-xs text-dark-muted transition-colors hover:border-white hover:text-white"
          >
            {preview ? "편집" : "미리보기"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-gold px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-dark-muted">제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            className="w-full rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-dark-muted">슬러그 *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="url-friendly-slug"
            className="w-full rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 font-mono text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-dark-muted">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="글 요약 (목록에 표시됩니다)"
            rows={2}
            className="w-full resize-none rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-dark-muted">
            태그 (쉼표로 구분)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="크립토, 에어드랍, BTC"
            className="w-full rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-dark-muted">
            본문 (마크다운)
          </label>
          {preview ? (
            <div className="min-h-64 rounded-lg border border-dark-border bg-dark-card px-4 py-3">
              <pre className="whitespace-pre-wrap text-sm text-dark-muted">
                {content || "내용을 입력하면 여기에 표시됩니다."}
              </pre>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="마크다운으로 본문을 작성하세요..."
              rows={20}
              className="w-full resize-y rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 font-mono text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-dark-border transition-colors peer-checked:bg-gold after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4" />
          </label>
          <span className="text-sm text-dark-muted">
            {published ? "공개" : "비공개"}
          </span>
        </div>
      </div>
    </main>
  );
}

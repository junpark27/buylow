"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

/* ── Simple regex-based markdown → HTML parser ── */
function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
    return `<pre class="md-codeblock"><code>${code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code></pre>`;
  });

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.includes('<pre class="md-codeblock">') || line.includes("</pre>")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(line);
      continue;
    }

    if (line.startsWith("### ")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<h3 class="md-h3">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<h2 class="md-h2">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<h1 class="md-h1">${line.slice(2)}</h1>`);
      continue;
    }

    if (line.startsWith("> ")) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(`<blockquote class="md-blockquote">${line.slice(2)}</blockquote>`);
      continue;
    }

    if (/^[-*] /.test(line)) {
      if (!inList) { result.push('<ul class="md-ul">'); inList = true; }
      result.push(`<li>${line.slice(2)}</li>`);
      continue;
    }

    if (inList && line.trim() === "") {
      result.push("</ul>");
      inList = false;
    }

    if (/^---+$/.test(line.trim())) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push("<hr class='md-hr' />");
      continue;
    }

    if (line.trim() === "") {
      result.push("<br />");
      continue;
    }

    if (inList) { result.push("</ul>"); inList = false; }
    result.push(`<p class="md-p">${line}</p>`);
  }
  if (inList) result.push("</ul>");

  html = result.join("\n");

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');

  return html;
}

/* ── Toolbar ── */
interface ToolbarAction {
  icon: string;
  label: string;
  prefix: string;
  suffix: string;
  block?: boolean;
}

const toolbarActions: ToolbarAction[] = [
  { icon: "B", label: "Bold", prefix: "**", suffix: "**" },
  { icon: "I", label: "Italic", prefix: "*", suffix: "*" },
  { icon: "H", label: "Heading", prefix: "## ", suffix: "", block: true },
  { icon: "</>", label: "Inline Code", prefix: "`", suffix: "`" },
  { icon: "{ }", label: "Code Block", prefix: "```\n", suffix: "\n```", block: true },
  { icon: "\"", label: "Quote", prefix: "> ", suffix: "", block: true },
  { icon: "-", label: "List", prefix: "- ", suffix: "", block: true },
  { icon: "Lk", label: "Link", prefix: "[", suffix: "](url)" },
  { icon: "Img", label: "Image", prefix: "![alt](", suffix: ")" },
];

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  published: boolean;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { user, authenticated, ready } = usePrivy();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [slug, setCurrentSlug] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userId = user?.id;

  useEffect(() => {
    params.then((p) => setCurrentSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!ready || !slug) return;
    if (!authenticated) {
      router.push("/");
      return;
    }
    async function init() {
      const adminRes = await fetch("/api/admin", {
        headers: { "x-user-id": userId! },
      });
      if (adminRes.ok) {
        const data = await adminRes.json();
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) {
          router.push("/");
          return;
        }
      }

      const postRes = await fetch(`/api/posts/${slug}`, {
        headers: { "x-user-id": userId! },
      });
      if (postRes.ok) {
        const post: Post = await postRes.json();
        setTitle(post.title);
        setDescription(post.description);
        setTags((post.tags ?? []).join(", "));
        setContent(post.content);
        setPublished(post.published);
      } else {
        router.push("/blog");
      }

      setChecking(false);
      setLoadingPost(false);
    }
    init();
  }, [ready, authenticated, userId, slug, router]);

  /* ── Auto-save every 30s ── */
  useEffect(() => {
    if (!slug) return;
    const key = `buylow-editor-draft-${slug}`;
    const interval = setInterval(() => {
      if (title || content) {
        try {
          localStorage.setItem(key, JSON.stringify({ title, description, tags, content }));
          const now = new Date();
          setLastSaved(
            `${now.getHours().toString().padStart(2, "0")}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")} 자동저장`
          );
        } catch {}
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [slug, title, description, tags, content]);

  /* ── Insert markdown at cursor ── */
  const insertMarkdown = useCallback(
    (action: ToolbarAction) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = content.substring(start, end);
      const before = content.substring(0, start);
      const after = content.substring(end);

      let insert: string;
      if (action.block && start > 0 && before[before.length - 1] !== "\n") {
        insert = "\n" + action.prefix + (selected || action.label) + action.suffix;
      } else {
        insert = action.prefix + (selected || action.label) + action.suffix;
      }

      const newContent = before + insert + after;
      setContent(newContent);

      requestAnimationFrame(() => {
        ta.focus();
        const cursorPos = start + action.prefix.length + (action.block && start > 0 && before[before.length - 1] !== "\n" ? 1 : 0);
        const selectEnd = cursorPos + (selected || action.label).length;
        ta.setSelectionRange(cursorPos, selectEnd);
      });
    },
    [content]
  );

  async function handleSave() {
    setError("");
    if (!title) {
      setError("제목은 필수입니다.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId!,
        },
        body: JSON.stringify({
          title,
          description,
          content,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          published,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "저장 실패");
      } else {
        try { localStorage.removeItem(`buylow-editor-draft-${slug}`); } catch {}
        router.push("/blog");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  if (!ready || checking || loadingPost) {
    return (
      <main className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-dark-card" />
          <div className="h-10 animate-pulse rounded-lg bg-dark-card" />
          <div className="h-10 animate-pulse rounded-lg bg-dark-card" />
          <div className="h-64 animate-pulse rounded-lg bg-dark-card" />
        </div>
      </main>
    );
  }

  if (!isAdmin) return null;

  const renderPreview = () => (
    <div
      className="md-preview min-h-[500px] rounded-lg border border-dark-border bg-dark-card px-6 py-4 text-sm leading-relaxed text-gray-300"
      dangerouslySetInnerHTML={{
        __html: content
          ? parseMarkdown(content)
          : '<p class="text-dark-muted">내용을 입력하면 여기에 미리보기가 표시됩니다.</p>',
      }}
    />
  );

  const renderEditor = () => (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-dark-border bg-[#111] px-2 py-1.5">
        {toolbarActions.map((action) => (
          <button
            key={action.label}
            onClick={() => insertMarkdown(action)}
            title={action.label}
            className="rounded px-2 py-1 text-xs font-mono text-dark-muted transition-colors hover:bg-dark-border hover:text-white"
          >
            {action.icon}
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="마크다운으로 본문을 작성하세요..."
        className="min-h-[500px] w-full flex-1 resize-y rounded-b-lg border border-dark-border bg-dark-card px-4 py-2.5 font-mono text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
      />
    </div>
  );

  return (
    <main className="mx-auto max-w-5xl px-6 pt-24 pb-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/blog")}
            className="rounded-lg border border-dark-border p-2 text-dark-muted transition-colors hover:border-white hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-extrabold">글 수정</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-lg border border-dark-border">
            {(["edit", "split", "preview"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  viewMode === mode
                    ? "bg-dark-border text-white"
                    : "text-dark-muted hover:text-white"
                }`}
              >
                {mode === "edit" ? "편집" : mode === "preview" ? "미리보기" : "분할"}
              </button>
            ))}
          </div>
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
          <label className="mb-1 block text-xs text-dark-muted">슬러그</label>
          <input
            type="text"
            value={slug}
            disabled
            className="w-full rounded-lg border border-dark-border bg-dark-card/50 px-4 py-2.5 font-mono text-sm text-dark-muted"
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

          {viewMode === "edit" && renderEditor()}
          {viewMode === "preview" && renderPreview()}
          {viewMode === "split" && (
            <div className="grid grid-cols-2 gap-4">
              {renderEditor()}
              <div>
                <div className="mb-[1px] rounded-t-lg border border-b-0 border-dark-border bg-[#111] px-3 py-1.5 text-xs text-dark-muted">
                  미리보기
                </div>
                {renderPreview()}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-4 text-xs text-dark-muted">
            {lastSaved && <span>{lastSaved}</span>}
            <span>{charCount}자</span>
            <span>{wordCount}단어</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .md-preview .md-h1 { font-size: 1.75rem; font-weight: 800; color: #fff; margin: 1.5rem 0 0.75rem; }
        .md-preview .md-h2 { font-size: 1.35rem; font-weight: 700; color: #fff; margin: 1.25rem 0 0.5rem; }
        .md-preview .md-h3 { font-size: 1.1rem; font-weight: 600; color: #fff; margin: 1rem 0 0.5rem; }
        .md-preview .md-p { margin: 0.5rem 0; line-height: 1.75; }
        .md-preview .md-blockquote { border-left: 3px solid #f59e0b; padding-left: 1rem; color: #aaa; margin: 0.75rem 0; font-style: italic; }
        .md-preview .md-ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .md-preview .md-ul li { margin: 0.25rem 0; }
        .md-preview .md-codeblock { background: #111; border: 1px solid #222; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-size: 0.8rem; margin: 0.75rem 0; }
        .md-preview .md-code { background: #222; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.85em; color: #f59e0b; }
        .md-preview .md-link { color: #f59e0b; text-decoration: underline; }
        .md-preview .md-img { max-width: 100%; border-radius: 0.5rem; margin: 0.75rem 0; }
        .md-preview .md-hr { border: none; border-top: 1px solid #333; margin: 1.5rem 0; }
        .md-preview strong { color: #fff; font-weight: 600; }
        .md-preview em { color: #ccc; }
      `}</style>
    </main>
  );
}

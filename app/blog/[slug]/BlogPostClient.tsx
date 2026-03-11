"use client";

import { useState } from "react";
import Link from "next/link";

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

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface BlogPostClientProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
}

export default function BlogPostClient({
  title,
  description,
  date,
  tags,
  content,
  slug,
}: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const readingTime = estimateReadingTime(content);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-dark-border px-3 py-1.5 text-xs text-dark-muted transition-colors hover:border-white hover:text-white"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          블로그 목록
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 border-b border-dark-border pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <time className="text-sm text-dark-muted">{date}</time>
          <span className="text-dark-muted">|</span>
          <span className="text-sm text-dark-muted">{readingTime}분 소요</span>
          {tags.length > 0 && (
            <>
              <span className="text-dark-muted">|</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-dark-muted">{description}</p>
        )}
      </header>

      {/* Article body */}
      <article
        className="md-preview md-article"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />

      {/* Footer actions */}
      <div className="mt-12 flex items-center justify-between border-t border-dark-border pt-6">
        <Link
          href="/blog"
          className="text-sm text-dark-muted transition-colors hover:text-gold"
        >
          ← 다른 글 보기
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border border-dark-border px-4 py-2 text-xs text-dark-muted transition-colors hover:border-gold/30 hover:text-gold"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          {copied ? "링크 복사됨!" : "공유"}
        </button>
      </div>

      {/* Markdown styles */}
      <style jsx global>{`
        .md-article { font-size: 1rem; line-height: 1.85; color: #d4d4d4; }
        .md-article .md-h1 { font-size: 1.75rem; font-weight: 800; color: #fff; margin: 2rem 0 1rem; }
        .md-article .md-h2 { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 1.75rem 0 0.75rem; border-bottom: 1px solid #222; padding-bottom: 0.5rem; }
        .md-article .md-h3 { font-size: 1.15rem; font-weight: 600; color: #fff; margin: 1.5rem 0 0.5rem; }
        .md-article .md-p { margin: 0.75rem 0; line-height: 1.85; }
        .md-article .md-blockquote { border-left: 3px solid #f59e0b; padding: 0.75rem 1rem; color: #aaa; margin: 1rem 0; font-style: italic; background: rgba(245,158,11,0.05); border-radius: 0 0.5rem 0.5rem 0; }
        .md-article .md-ul { list-style: disc; padding-left: 1.5rem; margin: 0.75rem 0; }
        .md-article .md-ul li { margin: 0.4rem 0; line-height: 1.75; }
        .md-article .md-codeblock { background: #111; border: 1px solid #222; border-radius: 0.5rem; padding: 1rem 1.25rem; overflow-x: auto; font-size: 0.85rem; margin: 1rem 0; line-height: 1.6; }
        .md-article .md-code { background: #222; padding: 0.2rem 0.45rem; border-radius: 0.25rem; font-size: 0.875em; color: #f59e0b; }
        .md-article .md-link { color: #f59e0b; text-decoration: underline; text-underline-offset: 2px; }
        .md-article .md-link:hover { color: #fbbf24; }
        .md-article .md-img { max-width: 100%; border-radius: 0.75rem; margin: 1.25rem 0; }
        .md-article .md-hr { border: none; border-top: 1px solid #333; margin: 2rem 0; }
        .md-article strong { color: #fff; font-weight: 600; }
        .md-article em { color: #ccc; }
      `}</style>
    </main>
  );
}

import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { db } from "@/lib/db";
import BlogPostClient from "./BlogPostClient";

async function getPost(slug: string) {
  // Try DB first
  try {
    const result = await db.query(
      "SELECT * FROM posts WHERE slug = $1 AND published = true",
      [slug]
    );
    if (result.rows.length > 0) {
      const row = result.rows[0];
      return {
        slug: row.slug,
        title: row.title,
        description: row.description,
        tags: row.tags ?? [],
        content: row.content,
        date: new Date(row.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    }
  } catch {
    // DB not available, fall through to filesystem
  }

  // Fallback to MDX files
  return getPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — buylow`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <BlogPostClient
      title={post.title}
      description={post.description}
      date={post.date}
      tags={post.tags}
      content={post.content}
      slug={slug}
    />
  );
}

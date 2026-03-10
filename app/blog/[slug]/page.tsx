import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/nav";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-3">
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
          <h1 className="text-3xl font-extrabold">{post.title}</h1>
        </div>
        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-gold">
          <MDXRemote source={post.content} />
        </article>
      </main>
    </>
  );
}

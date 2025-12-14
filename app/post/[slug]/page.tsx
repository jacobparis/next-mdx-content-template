import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllSlugs } from "@/lib/mdx"
import { MdxComponents, Callout, ImageGrid } from "@/components/mdx-components"

// Revalidate every hour
export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl font-bold mt-2 mb-4 text-balance">{post.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty">{post.description}</p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={{ ...MdxComponents, Callout, ImageGrid }} />
        </div>
      </article>
    </div>
  )
}

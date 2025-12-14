import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"

// Revalidate every hour
export const revalidate = 3600

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Blog</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/post/${post.slug}`}>
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-2xl font-bold mt-2 mb-3 group-hover:underline transition-all text-balance">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-pretty">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

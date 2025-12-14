import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"

// Revalidate every hour
export const revalidate = 3600

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div>
      <header className="border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 text-xl">
            <Link href="/" className="font-bold text-foreground hover:opacity-70 transition-opacity">
              Blog
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="font-bold text-accent">Engineering</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/post/${post.slug}`} className="block">
                <h2 className="mt-3 group-hover:opacity-70 transition-opacity text-balance leading-tight font-semibold text-2xl">
                  {post.title}
                </h2>
                <time className="text-sm text-muted-foreground block mt-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="text-base text-muted-foreground text-pretty leading-relaxed mt-2">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

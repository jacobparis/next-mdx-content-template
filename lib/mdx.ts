import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

export interface PostMetadata {
  title: string
  date: string
  description: string
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = fs.readdirSync(contentDirectory)

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContent)

      return {
        title: data.title,
        date: data.date,
        description: data.description,
        slug: file.replace(".mdx", ""),
      } as PostMetadata
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      slug,
      content,
    }
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(contentDirectory)
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(".mdx", ""))
}

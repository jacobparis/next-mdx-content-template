import { MdxComponents, Callout } from "@/components/mdx-components"
import { PostHeader } from "@/components/post-header"
import { SocialShare } from "@/components/social-share"
import { NextPost } from "@/components/next-post"

export default async function FakePostPage() {
  const { a, h2, h3, p, ul, li, code, pre } = MdxComponents

  const mockNextPost = {
    slug: "fake-post",
    title: "Understanding ISR and Webhooks",
    description:
      "Learn how Incremental Static Regeneration works with GitHub webhooks to keep your content fresh without full rebuilds.",
    date: new Date().toISOString(),
  }

  return (
    <>
      <PostHeader title="v0 Development Preview" date={new Date().toISOString()} />

      <div className="prose-custom">
        {p({
          children:
            "You're viewing a placeholder post because MDXRemote doesn't work in the v0 preview environment. This demonstrates the blog's design and functionality during development.",
        })}

        {h2({ children: "Why This Placeholder?" })}

        {p({
          children:
            "This blog fetches content from GitHub using Octokit and renders it with MDXRemote. While this works perfectly in production, the v0 preview environment can't execute MDXRemote's server-side MDX compilation.",
        })}

        {p({
          children:
            "Instead, this page uses hardcoded JSX with the same MDX components to show you exactly how your blog will look and feel when deployed.",
        })}

        {h2({ children: "What You're Seeing" })}

        {ul({
          children: [
            li({ children: "The actual design system with typography, colors, and spacing" }),
            li({ children: "Custom MDX components like callouts and code blocks" }),
            li({ children: "Social share links and next post navigation" }),
            li({ children: "The complete post layout including breadcrumbs" }),
          ],
        })}

        {h3({ children: "Custom Components Work" })}

        <Callout type="info">
          {p({
            children:
              "Custom components like this callout will work identically in your real posts. Add them to your MDX files and they'll render with the same styling.",
          })}
        </Callout>

        {h3({ children: "Code Blocks Too" })}

        {p({ children: "Syntax highlighting and copy buttons work as expected:" })}

        {pre({
          children: code({
            children: `// Your actual blog posts will render code like this
export async function getBlogPosts() {
  const posts = await octokit.getContent('content/')
  return posts.map(post => compileMDX(post))
}`,
          }),
        })}

        {p({
          children: [
            "Deploy this blog to see real content from your GitHub repository. ",
            a({ href: "https://github.com", children: "Learn more about setup" }),
          ],
        })}
      </div>

      <div className="flex gap-x-4 mt-12">
        <SocialShare title="v0 Development Preview" slug="fake-post" />
        <NextPost post={mockNextPost} />
      </div>
    </>
  )
}

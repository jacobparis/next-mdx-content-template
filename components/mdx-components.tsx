import type React from "react"
import type { ComponentPropsWithoutRef } from "react"

// Custom MDX components that can be used in blog posts
export const MdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="text-4xl font-bold mt-6 text-balance" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="text-3xl font-bold mt-12 text-balance" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="text-2xl font-semibold mt-8 text-balance" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="leading-relaxed mt-4 text-pretty" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="underline decoration-muted-foreground hover:decoration-foreground transition-colors" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="list-disc list-inside mt-4 space-y-2" {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="list-decimal list-inside mt-4 space-y-2" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-4 text-sm" {...props} />
  ),
}

// Custom components for blog posts
export function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode
  type?: "info" | "warning" | "success"
}) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
    warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900",
    success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
  }

  return <div className={`border-l-4 p-4 my-6 rounded-r ${styles[type]}`}>{children}</div>
}

export function ImageGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 my-6">{children}</div>
}

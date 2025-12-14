import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Minimal Blog",
  description: "A hyper-minimal blog built with Next.js and MDX",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-border/50 mt-16">
          <div className="max-w-4xl mx-auto px-6 text-center py-3">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://x.com/jacobmparis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                @jacobmparis
              </a>{" "}
              in{" "}
              <a
                href="https://v0.app/ref/N52E9N"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                v0
              </a>
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}

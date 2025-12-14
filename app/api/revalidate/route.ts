import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// Webhook endpoint to trigger ISR revalidation
export async function POST(request: NextRequest) {
  // Verify the webhook secret
  const authHeader = request.headers.get("authorization")
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET not configured" }, { status: 500 })
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Invalid authorization" }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log("[v0] Webhook received:", body)

    // Revalidate homepage and all post pages
    revalidatePath("/")
    revalidatePath("/post/[slug]", "page")
    revalidateTag("posts")

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Revalidation error:", error)
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}

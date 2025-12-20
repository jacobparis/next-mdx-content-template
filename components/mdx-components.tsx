"use client"

import type React from "react"
import { useId, type ComponentPropsWithoutRef } from "react"
import { CopyButton } from "@/components/copy-button"

// Custom MDX components that can be used in blog posts
export const MdxComponents = {
	h1: (props: ComponentPropsWithoutRef<"h1">) => (
		<h1
			className="text-4xl font-semibold mt-8 mb-2 tracking-tight scroll-mt-20 text-balance"
			{...props}
		/>
	),
	h2: (props: ComponentPropsWithoutRef<"h2">) => (
		<h2 className="text-2xl font-semibold mt-8 mb-2 tracking-tight scroll-mt-20" {...props} />
	),
	h3: (props: ComponentPropsWithoutRef<"h3">) => (
		<h3 className="text-xl font-semibold mt-6 mb-2 tracking-tight scroll-mt-20" {...props} />
	),
	h4: (props: ComponentPropsWithoutRef<"h4">) => (
		<h4 className="text-lg font-semibold mb-2 tracking-tight scroll-mt-20" {...props} />
	),
	h5: (props: ComponentPropsWithoutRef<"h5">) => (
		<h5 className="text-sm font-semibold mb-2 tracking-tight scroll-mt-20" {...props} />
	),
	h6: (props: ComponentPropsWithoutRef<"h6">) => (
		<h6 className="text-xs font-semibold mb-2 scroll-mt-20" {...props} />
	),
	p: (props: ComponentPropsWithoutRef<"p">) => (
		<p className="mt-4 text-base text-secondary leading-relaxed text-pretty" {...props} />
	),
	a: (props: ComponentPropsWithoutRef<"a">) => (
		<a
			className="text-accent underline decoration-gray-400/50 underline-offset-2 transition-colors duration-200 hover:decoration-accent font-normal"
			{...props}
		/>
	),
	ul: (props: ComponentPropsWithoutRef<"ul">) => (
		<ul
			className="list-disc pl-6 mt-6 space-y-2 [&_li::marker]:text-muted-foreground/80"
			{...props}
		/>
	),
	ol: (props: ComponentPropsWithoutRef<"ol">) => (
		<ol
			className="list-decimal pl-6 mt-6 space-y-2 [&_li::marker]:text-muted-foreground/80"
			{...props}
		/>
	),
	li: (props: ComponentPropsWithoutRef<"li">) => (
		<li className="text-base -ml-px pl-px" {...props} />
	),
	blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
		<blockquote className="border-l-4 border-accent pl-6 my-6 not-italic" {...props} />
	),
	code: (props: ComponentPropsWithoutRef<"code">) => (
		<code
			className="before:content-none after:content-none bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-words"
			{...props}
		/>
	),
	pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
		// Extract language from className if present
		const codeElement = children as any
		const className = codeElement?.props?.className || ""
		const language = className.replace(/language-/, "").toUpperCase() || "CODE"

		return (
			<div className="max-w-full rounded border border-border mt-3">
				<div className="flex items-center justify-between border-b border-border px-1">
					<div className="py-3 px-2 text-xs font-medium leading-none opacity-60 text-foreground">
						{language}{" "}
					</div>
					<CopyButton />
				</div>
				<pre
					className="mt-0! w-full overflow-auto whitespace-pre p-2 font-mono text-sm [&_code]:bg-transparent"
					{...props}
				>
					{children}
				</pre>
			</div>
		)
	},
}

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

	return (
		<div className={`border-l-4 p-4 my-6 rounded-r [&>p:first-child]:mt-0 ${styles[type]}`}>
			{children}
		</div>
	)
}

export function SideNote({ children }: { children: React.ReactNode }) {
	const id = useId()

	return (
		<span role="complementary">
			<label
				htmlFor={id}
				className="relative -top-1 -mx-4 inline cursor-pointer px-4 align-baseline text-xs text-blue-700 after:content-['['_counter(footnote-counter)_']'] md:cursor-default md:text-gray-600"
				style={{ counterIncrement: "footnote-counter" }}
			/>
			<input type="checkbox" id={id} tabIndex={0} className="peer hidden" defaultChecked={true} />
			<span className="relative hidden w-full transform overflow-visible border-l pl-4 align-baseline text-sm opacity-90 before:relative before:-top-1 before:text-xs before:content-['['_counter(footnote-counter)_']'] peer-checked:left-0 peer-checked:float-left peer-checked:clear-both peer-checked:my-4 peer-checked:block peer-checked:h-auto md:!float-right md:!clear-right md:!my-0 md:mr-[-33%] md:block md:w-[33%] md:translate-x-4">
				{children}
			</span>
		</span>
	)
}

export function Highlight({ children }: { children?: React.ReactNode }) {
	if (!children) {
		return null
	}

	return <span className="-mx-1 bg-yellow-100 py-2 px-1 text-gray-700"> {children} </span>
}

export function Tweet({
	text,
	imageUrl = "",
	tweetUrl = "",
	className = "",
}: {
	text: string | string[]
	imageUrl?: string
	tweetUrl?: string
	className?: string
}) {
	const paragraphs = Array.isArray(text) ? text : [text]
	return (
		<div
			className={`relative my-4 rounded-xl border bg-white p-4 hover:bg-gray-50 hover:shadow-sm ${className} not-prose`}
		>
			{tweetUrl ? (
				<a href={tweetUrl} className="absolute inset-0">
					<span className="sr-only">View tweet</span>
				</a>
			) : null}

			<div className="mb-4 py-2">
				<div className="flex items-center">
					<img src="/images/jacob.png" alt="Tweet" className="w-12 rounded-full" />
					<div className="px-2">
						<div>
							<span className="font-semibold">Jacob Paris 🇨🇦</span>
						</div>
						<div>
							<span className="text-gray-700">@jacobmparis</span>
						</div>
					</div>
				</div>
			</div>

			{paragraphs.map((paragraph, i) => (
				<p className="mb-4 text-black" key={i}>
					{paragraph}
				</p>
			))}

			{imageUrl ? <img className="rounded-lg border" src={imageUrl} alt="" /> : null}
		</div>
	)
}

export function YoutubeVideo({ videoId }: { videoId: string }) {
	return (
		<div className="rounded-lg bg-white p-2 shadow-sm">
			<iframe
				className="mx-auto max-w-full rounded"
				width="560"
				height="315"
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
		</div>
	)
}

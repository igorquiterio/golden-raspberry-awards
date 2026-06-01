import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type PageContainerProps = {
	children: ReactNode
	className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
	return (
		<div
			className={cn(
				"w-full max-w-6xl flex-1 px-6 py-6 sm:px-8 lg:py-8",
				className,
			)}
		>
			{children}
		</div>
	)
}

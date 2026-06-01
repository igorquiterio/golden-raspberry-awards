"use client"

import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MoviesPaginationProps = {
	page: number
	totalPages: number
}

function buildQueryString(
	searchParams: URLSearchParams,
	page: number,
): string {
	const params = new URLSearchParams(searchParams.toString())
	params.set("page", String(page))
	return params.toString()
}

function getVisiblePages(current: number, total: number): number[] {
	if (total <= 5) {
		return Array.from({ length: total }, (_, index) => index)
	}

	const start = Math.max(0, Math.min(current - 2, total - 5))
	return Array.from({ length: 5 }, (_, index) => start + index)
}

export function MoviesPagination({ page, totalPages }: MoviesPaginationProps) {
	const searchParams = useSearchParams()
	const visiblePages = getVisiblePages(page, totalPages)
	const hasPrevious = page > 0
	const hasNext = page < totalPages - 1

	function hrefFor(targetPage: number) {
		return `/list?${buildQueryString(searchParams, targetPage)}`
	}

	return (
		<div className="flex items-center justify-center gap-1 pt-4">
			<Button variant="outline" size="icon-sm" asChild disabled={!hasPrevious}>
				<Link
					href={hasPrevious ? hrefFor(0) : "#"}
					aria-disabled={!hasPrevious}
					className={cn(!hasPrevious && "pointer-events-none opacity-50")}
				>
					<ChevronsLeft />
					<span className="sr-only">First page</span>
				</Link>
			</Button>
			<Button variant="outline" size="icon-sm" asChild disabled={!hasPrevious}>
				<Link
					href={hasPrevious ? hrefFor(page - 1) : "#"}
					aria-disabled={!hasPrevious}
					className={cn(!hasPrevious && "pointer-events-none opacity-50")}
				>
					<ChevronLeft />
					<span className="sr-only">Previous page</span>
				</Link>
			</Button>

			{visiblePages.map((pageIndex) => (
				<Button
					key={pageIndex}
					variant={pageIndex === page ? "default" : "outline"}
					size="icon-sm"
					asChild
				>
					<Link href={hrefFor(pageIndex)}>{pageIndex + 1}</Link>
				</Button>
			))}

			<Button variant="outline" size="icon-sm" asChild disabled={!hasNext}>
				<Link
					href={hasNext ? hrefFor(page + 1) : "#"}
					aria-disabled={!hasNext}
					className={cn(!hasNext && "pointer-events-none opacity-50")}
				>
					<ChevronRight />
					<span className="sr-only">Next page</span>
				</Link>
			</Button>
			<Button variant="outline" size="icon-sm" asChild disabled={!hasNext}>
				<Link
					href={hasNext ? hrefFor(totalPages - 1) : "#"}
					aria-disabled={!hasNext}
					className={cn(!hasNext && "pointer-events-none opacity-50")}
				>
					<ChevronsRight />
					<span className="sr-only">Last page</span>
				</Link>
			</Button>
		</div>
	)
}

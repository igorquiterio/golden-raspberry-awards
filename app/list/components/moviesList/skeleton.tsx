import { Skeleton } from "@/components/ui/skeleton"

export function MoviesListSkeleton() {
	return (
		<div className="space-y-3">
			<div className="flex gap-4 border-b pb-3">
				<Skeleton className="h-4 w-8" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-16" />
			</div>
			{Array.from({ length: 15 }).map((_, index) => (
				<div key={index} className="flex gap-4">
					<Skeleton className="h-4 w-8" />
					<Skeleton className="h-4 w-12" />
					<Skeleton className="h-4 w-48" />
					<Skeleton className="h-4 w-10" />
				</div>
			))}
			<div className="flex justify-center gap-2 pt-4">
				{Array.from({ length: 9 }).map((_, index) => (
					<Skeleton key={index} className="size-8" />
				))}
			</div>
		</div>
	)
}

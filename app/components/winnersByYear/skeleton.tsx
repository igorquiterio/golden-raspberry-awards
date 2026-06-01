import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WinnersByYearSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-56" />
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Skeleton className="h-9 flex-1" />
					<Skeleton className="size-9 shrink-0" />
				</div>
				<div className="flex gap-4 border-b pb-3">
					<Skeleton className="h-4 w-8" />
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-12" />
				</div>
				{Array.from({ length: 2 }).map((_, index) => (
					<div key={index} className="flex gap-4">
						<Skeleton className="h-4 w-8" />
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-4 w-12" />
					</div>
				))}
			</CardContent>
		</Card>
	)
}

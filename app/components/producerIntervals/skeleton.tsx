import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function TableSectionSkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="h-5 w-24" />
			<div className="flex gap-3 border-b pb-3">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-28" />
				<Skeleton className="h-4 w-28" />
			</div>
			<div className="flex gap-3">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-4 w-10" />
				<Skeleton className="h-4 w-12" />
				<Skeleton className="h-4 w-12" />
			</div>
		</div>
	)
}

export function ProducerIntervalsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-full max-w-md" />
			</CardHeader>
			<CardContent className="space-y-6">
				<TableSectionSkeleton />
				<TableSectionSkeleton />
			</CardContent>
		</Card>
	)
}

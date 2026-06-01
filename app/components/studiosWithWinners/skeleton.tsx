import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StudiosWithWinnersSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-52" />
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex gap-4 border-b pb-3">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-24" />
				</div>
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="flex gap-4">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-4 w-8" />
					</div>
				))}
			</CardContent>
		</Card>
	)
}

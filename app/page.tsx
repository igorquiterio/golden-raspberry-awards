import { Suspense } from "react"
import { MultipleWinners } from "./components/multipleWinners"
import { MultipleWinnersSkeleton } from "./components/multipleWinners/skeleton"

export default function Home() {
	return (
		<div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
			<Suspense fallback={<MultipleWinnersSkeleton />}>
				<MultipleWinners />
			</Suspense>
			<Suspense fallback={<MultipleWinnersSkeleton />}>
				<MultipleWinners />
			</Suspense>
			<Suspense fallback={<MultipleWinnersSkeleton />}>
				<MultipleWinners />
			</Suspense>
			<Suspense fallback={<MultipleWinnersSkeleton />}>
				<MultipleWinners />
			</Suspense>
		</div>
	)
}

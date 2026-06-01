import { Suspense } from "react"
import { MultipleWinners } from "./components/multipleWinners"
import { MultipleWinnersSkeleton } from "./components/multipleWinners/skeleton"
import { ProducerIntervals } from "./components/producerIntervals"
import { ProducerIntervalsSkeleton } from "./components/producerIntervals/skeleton"
import { StudiosWithWinners } from "./components/studiosWithWinners"
import { StudiosWithWinnersSkeleton } from "./components/studiosWithWinners/skeleton"
import { WinnersByYear } from "./components/winnersByYear"
import { WinnersByYearSkeleton } from "./components/winnersByYear/skeleton"

export default function Home() {
	return (
		<div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
			<Suspense fallback={<MultipleWinnersSkeleton />}>
				<MultipleWinners />
			</Suspense>
			<Suspense fallback={<StudiosWithWinnersSkeleton />}>
				<StudiosWithWinners />
			</Suspense>
			<Suspense fallback={<ProducerIntervalsSkeleton />}>
				<ProducerIntervals />
			</Suspense>
			<Suspense fallback={<WinnersByYearSkeleton />}>
				<WinnersByYear />
			</Suspense>
		</div>
	)
}

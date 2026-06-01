import { Label } from "radix-ui"
import { ProducerWithInterval } from "@/app/lib/api/api-types"
import {
	getMaxMinWinIntervalForProducers,
	getStudiosWithWinCount,
} from "@/app/lib/api/movies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export async function ProducerIntervals() {
	const { min, max } = await getMaxMinWinIntervalForProducers()

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Producers with longest and shortest interval between wins
				</CardTitle>
			</CardHeader>
			<CardContent>
				<h3 className="text-lg font-medium">Maximum</h3>
				<ProducerIntervalsTable intervals={max} />
				<Separator className="my-4" />
				<h3 className="text-lg font-medium">Minimum</h3>
				<ProducerIntervalsTable intervals={min} />
			</CardContent>
		</Card>
	)
}

function ProducerIntervalsTable({
	intervals,
}: {
	intervals: ProducerWithInterval[]
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Producer</TableHead>
					<TableHead>Inteerval</TableHead>
					<TableHead>Previous Year</TableHead>
					<TableHead>Following Year</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{intervals.map((interval) => (
					<TableRow key={interval.producer}>
						<TableCell>{interval.producer}</TableCell>
						<TableCell>{interval.interval}</TableCell>
						<TableCell>{interval.previousWin}</TableCell>
						<TableCell>{interval.followingWin}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

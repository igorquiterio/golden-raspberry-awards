import { getStudiosWithWinCount } from "@/app/lib/api/movies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export async function StudiosWithWinners() {
	const { studios } = await getStudiosWithWinCount()
	const topThree = studios.slice(0, 3)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Top 3 studios with winners</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Win Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topThree.map((studio) => (
							<TableRow key={studio.name}>
								<TableCell>{studio.name}</TableCell>
								<TableCell>{studio.winCount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

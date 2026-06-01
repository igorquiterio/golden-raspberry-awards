import { getYearsWithMultipleWinners } from "@/app/lib/api/movies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export async function MultipleWinners() {
	const { years } = await getYearsWithMultipleWinners()

	return (
		<Card>
			<CardHeader>
				<CardTitle>List years with multiple winners</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Year</TableHead>
							<TableHead>Win Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{years.map((year) => (
							<TableRow key={year.year}>
								<TableCell>{year.year}</TableCell>
								<TableCell>{year.winnerCount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

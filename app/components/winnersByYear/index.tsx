"use client"

import { Search } from "lucide-react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { type WinnersByYearState, winnersByYearAction } from "./action"

const initialState: WinnersByYearState = {}

export function WinnersByYear() {
	const [state, formAction, isPending] = useActionState(
		winnersByYearAction,
		initialState,
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle>List movie winners by year</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<form className="flex gap-2" action={formAction}>
					<Input
						name="year"
						type="number"
						placeholder="Search by year"
						required
					/>
					<Button type="submit" size="icon" disabled={isPending}>
						<Search />
					</Button>
				</form>

				{state.error && (
					<p className="text-sm text-destructive">{state.error}</p>
				)}

				{state.winners && state.winners.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Year</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{state.winners.map((movie) => (
								<TableRow key={movie.id}>
									<TableCell>{movie.id}</TableCell>
									<TableCell>{movie.title}</TableCell>
									<TableCell>{movie.year}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}

				{state.winners?.length === 0 && (
					<p className="text-sm text-muted-foreground">
						No winners found for this year.
					</p>
				)}
			</CardContent>
		</Card>
	)
}

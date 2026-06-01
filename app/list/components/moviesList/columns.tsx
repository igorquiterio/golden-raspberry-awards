"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { MovieResponse } from "@/app/lib/api/api-types"
import { WinnerFilter } from "./winner-filter"
import { YearFilter } from "./year-filter"

type MoviesColumnsOptions = {
	year?: number
	winner?: boolean
}

export function getMoviesColumns({
	year,
	winner,
}: MoviesColumnsOptions): ColumnDef<MovieResponse>[] {
	return [
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => row.original.id,
		},
		{
			accessorKey: "year",
			header: () => (
				<div className="flex flex-col gap-2">
					<span>Year</span>
					<YearFilter defaultValue={year} />
				</div>
			),
			cell: ({ row }) => row.original.year,
		},
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => row.original.title,
		},
		{
			accessorKey: "winner",
			header: () => (
				<div className="flex flex-col gap-2">
					<span>Winner?</span>
					<WinnerFilter value={winner} />
				</div>
			),
			cell: ({ row }) => (row.original.winner ? "Yes" : "No"),
		},
	]
}

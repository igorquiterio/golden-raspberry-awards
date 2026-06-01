"use client"

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import type { MovieResponse } from "@/app/lib/api/api-types"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { getMoviesColumns } from "./columns"
import { MoviesPagination } from "./pagination"

type MoviesDataTableProps = {
	movies: MovieResponse[]
	page: number
	totalPages: number
	year?: number
	winner?: boolean
}

export function MoviesDataTable({
	movies,
	page,
	totalPages,
	year,
	winner,
}: MoviesDataTableProps) {
	const columns = getMoviesColumns({ year, winner })

	const table = useReactTable({
		data: movies,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: totalPages,
	})

	return (
		<div className="space-y-0">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className="align-top font-semibold">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row, index) => (
							<TableRow
								key={row.id}
								className={cn(index % 2 === 1 && "bg-muted/30")}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No movies found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{totalPages > 0 && (
				<MoviesPagination page={page} totalPages={totalPages} />
			)}
		</div>
	)
}

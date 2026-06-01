import { getMovies } from "../lib/api/movies"
import { MoviesDataTable } from "./components/moviesList/data-table"
import { ListPageProps } from "./types"

export async function MoviesList({
	searchParams,
}: {
	searchParams: ListPageProps["searchParams"]
}) {
	const PAGE_SIZE = 15
	const params = await searchParams
	const page = Math.max(0, Number(params.page ?? 0) || 0)
	const winner =
		params.winner === "true"
			? true
			: params.winner === "false"
				? false
				: undefined
	const parsedYear = params.year ? Number(params.year) : undefined
	const year =
		parsedYear !== undefined && !Number.isNaN(parsedYear)
			? parsedYear
			: undefined

	const data = await getMovies({
		page,
		size: PAGE_SIZE,
		winner,
		year,
	})

	return (
		<MoviesDataTable
			movies={data.content}
			page={data.number}
			totalPages={data.totalPages}
			year={year}
			winner={winner}
		/>
	)
}

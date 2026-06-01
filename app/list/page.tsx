import { Suspense } from "react"
import { getMovies } from "@/app/lib/api/movies"
import { MoviesDataTable } from "@/app/list/components/moviesList/data-table"
import { MoviesListSkeleton } from "@/app/list/components/moviesList/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoviesList } from "./moviesList"
import type { ListPageProps } from "./types"

export default function ListPage({ searchParams }: ListPageProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>List movies</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<MoviesListSkeleton />}>
					<MoviesList searchParams={searchParams} />
				</Suspense>
			</CardContent>
		</Card>
	)
}

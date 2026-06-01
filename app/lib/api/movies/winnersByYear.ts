"use server"

import { fetchData } from "../api"
import type { MovieResponse } from "../api-types"

/** GET /api/movies/winnersByYear */
export async function getWinnersByYear(year: number) {
	return fetchData<MovieResponse[]>({
		path: "winnersByYear",
		queryParams: { year: String(year) },
	})
}

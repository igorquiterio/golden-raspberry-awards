import { fetchData } from "../api"
import type { MovieResponse } from "../api-types"

/** GET /api/movies/{id} */
export async function getMovieById(id: number) {
	return fetchData<MovieResponse>({ path: String(id) })
}

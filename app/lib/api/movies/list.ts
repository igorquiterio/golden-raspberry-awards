import { fetchData, toQueryParams } from "../api"
import type { PageMovieResponse } from "../api-types"

/** GET /api/movies */
export async function getMovies(params: {
	page: number
	size: number
	winner?: boolean
	year?: number
}) {
	return fetchData<PageMovieResponse>({
		queryParams: await toQueryParams(params),
	})
}

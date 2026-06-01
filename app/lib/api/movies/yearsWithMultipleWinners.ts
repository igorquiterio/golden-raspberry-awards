import { fetchData } from "../api"
import type { YearsWithMultipleWinnersResponse } from "../api-types"

/** GET /api/movies/yearsWithMultipleWinners */
export async function getYearsWithMultipleWinners() {
	return fetchData<YearsWithMultipleWinnersResponse>({
		path: "yearsWithMultipleWinners",
		revalidate: 60 * 60 * 24,
		tag: "yearsWithMultipleWinners",
	})
}

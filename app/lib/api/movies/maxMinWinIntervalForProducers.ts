import { fetchData } from "../api"
import type { MaxMinWinIntervalForProducersResponse } from "../api-types"

/** GET /api/movies/maxMinWinIntervalForProducers */
export async function getMaxMinWinIntervalForProducers() {
	return fetchData<MaxMinWinIntervalForProducersResponse>({
		path: "maxMinWinIntervalForProducers",
		revalidate: 60 * 60 * 24,
		tag: "maxMinWinIntervalForProducers",
	})
}

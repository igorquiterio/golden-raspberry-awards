import { fetchData } from "../api"
import type { StudiosWithWinCountResponse } from "../api-types"

/** GET /api/movies/studiosWithWinCount */
export async function getStudiosWithWinCount() {
	return fetchData<StudiosWithWinCountResponse>({
		path: "studiosWithWinCount",
		revalidate: 60 * 60 * 24,
		tag: "studiosWithWinCount",
	})
}

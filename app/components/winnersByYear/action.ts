"use server"

import type { MovieResponse } from "@/app/lib/api/api-types"
import { getWinnersByYear } from "@/app/lib/api/movies/winnersByYear"

export type WinnersByYearState = {
	error?: string
	winners?: MovieResponse[]
}

export async function winnersByYearAction(
	_prevState: WinnersByYearState,
	formData: FormData,
): Promise<WinnersByYearState> {
	const year = formData.get("year")

	if (!year || year.toString().trim() === "") {
		return { error: "Year is required" }
	}

	const parsedYear = Number(year)

	try {
		const winners = await getWinnersByYear(parsedYear)
		return { winners }
	} catch {
		return { error: "Failed to load winners" }
	}
}

import { describe, expect, it, vi } from "vitest"
import { getWinnersByYear } from "@/app/lib/api/movies/winnersByYear"
import { winnersByYearAction } from "./action"

vi.mock("@/app/lib/api/movies/winnersByYear", () => ({
	getWinnersByYear: vi.fn(),
}))

describe("winnersByYearAction", () => {
	it("returns an error when year is missing", async () => {
		const formData = new FormData()
		const result = await winnersByYearAction({}, formData)

		expect(result).toEqual({ error: "Year is required" })
	})

	it("returns winners for a valid year", async () => {
		vi.mocked(getWinnersByYear).mockResolvedValue([
			{
				id: 1,
				year: 1980,
				title: "Can't Stop the Music",
				studios: ["Associated Film Distribution"],
				producers: ["Allan Carr"],
				winner: true,
			},
		])

		const formData = new FormData()
		formData.set("year", "1980")
		const result = await winnersByYearAction({}, formData)

		expect(result.winners).toHaveLength(1)
		expect(result.winners?.[0].title).toBe("Can't Stop the Music")
	})

	it("returns an error when the API fails", async () => {
		vi.mocked(getWinnersByYear).mockRejectedValue(new Error("API down"))

		const formData = new FormData()
		formData.set("year", "1980")
		const result = await winnersByYearAction({}, formData)

		expect(result).toEqual({ error: "Failed to load winners" })
	})
})

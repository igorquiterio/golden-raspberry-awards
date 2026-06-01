import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { getYearsWithMultipleWinners } from "@/app/lib/api/movies"
import { MultipleWinners } from "./index"

vi.mock("@/app/lib/api/movies", () => ({
	getYearsWithMultipleWinners: vi.fn(),
}))

describe("MultipleWinners", () => {
	it("renders years with multiple winners from the API", async () => {
		vi.mocked(getYearsWithMultipleWinners).mockResolvedValue({
			years: [
				{ year: 1986, winnerCount: 2 },
				{ year: 1990, winnerCount: 2 },
			],
		})

		render(await MultipleWinners())

		expect(screen.getByText(/list years with multiple winners/i)).toBeInTheDocument()
		expect(screen.getByText("1986")).toBeInTheDocument()
		expect(screen.getByText("1990")).toBeInTheDocument()
		expect(screen.getAllByRole("row")).toHaveLength(3)
	})
})

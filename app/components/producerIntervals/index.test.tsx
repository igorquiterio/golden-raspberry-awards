import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { getMaxMinWinIntervalForProducers } from "@/app/lib/api/movies"
import { ProducerIntervals } from "./index"

vi.mock("@/app/lib/api/movies", () => ({
	getMaxMinWinIntervalForProducers: vi.fn(),
}))

describe("ProducerIntervals", () => {
	it("renders maximum and minimum producer intervals", async () => {
		vi.mocked(getMaxMinWinIntervalForProducers).mockResolvedValue({
			max: [
				{
					producer: "Matthew Vaughn",
					interval: 13,
					previousWin: 2002,
					followingWin: 2015,
				},
			],
			min: [
				{
					producer: "Joel Silver",
					interval: 1,
					previousWin: 1990,
					followingWin: 1991,
				},
			],
		})

		render(await ProducerIntervals())

		expect(screen.getByRole("heading", { name: "Maximum" })).toBeInTheDocument()
		expect(screen.getByRole("heading", { name: "Minimum" })).toBeInTheDocument()
		expect(screen.getByText("Matthew Vaughn")).toBeInTheDocument()
		expect(screen.getByText("Joel Silver")).toBeInTheDocument()
		expect(screen.getByText("13")).toBeInTheDocument()
	})
})

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { WinnersByYearState } from "./action"
import { WinnersByYear } from "./index"

const actionState = vi.hoisted(() => ({
	value: { winners: [] } as WinnersByYearState,
}))

vi.mock("react", async (importOriginal) => {
	const actual = await importOriginal<typeof import("react")>()
	return {
		...actual,
		useActionState: () =>
			[actionState.value, vi.fn(), false] as [
				WinnersByYearState,
				() => void,
				boolean,
			],
	}
})

describe("WinnersByYear", () => {
	it("renders the search form and winners table", () => {
		actionState.value = {
			winners: [
				{
					id: 1,
					year: 1980,
					title: "Can't Stop the Music",
					studios: [],
					producers: [],
					winner: true,
				},
			],
		}

		render(<WinnersByYear />)

		expect(screen.getByText(/list movie winners by year/i)).toBeInTheDocument()
		expect(screen.getByPlaceholderText(/search by year/i)).toBeRequired()
		expect(screen.getByText("Can't Stop the Music")).toBeInTheDocument()
	})

	it("shows an error message from action state", () => {
		actionState.value = { error: "Year is required" }

		render(<WinnersByYear />)

		expect(screen.getByText("Year is required")).toBeInTheDocument()
	})

	it("shows empty state when there are no winners", () => {
		actionState.value = { winners: [] }

		render(<WinnersByYear />)

		expect(
			screen.getByText(/no winners found for this year/i),
		).toBeInTheDocument()
	})
})

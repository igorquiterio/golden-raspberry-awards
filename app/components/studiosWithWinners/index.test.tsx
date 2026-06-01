import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { getStudiosWithWinCount } from "@/app/lib/api/movies"
import { StudiosWithWinners } from "./index"

vi.mock("@/app/lib/api/movies", () => ({
	getStudiosWithWinCount: vi.fn(),
}))

describe("StudiosWithWinners", () => {
	it("renders only the top 3 studios", async () => {
		vi.mocked(getStudiosWithWinCount).mockResolvedValue({
			studios: [
				{ name: "Columbia Pictures", winCount: 7 },
				{ name: "Paramount Pictures", winCount: 6 },
				{ name: "Warner Bros.", winCount: 5 },
				{ name: "MGM", winCount: 3 },
			],
		})

		render(await StudiosWithWinners())

		expect(screen.getByText("Columbia Pictures")).toBeInTheDocument()
		expect(screen.getByText("Warner Bros.")).toBeInTheDocument()
		expect(screen.queryByText("MGM")).not.toBeInTheDocument()
		expect(screen.getAllByRole("row")).toHaveLength(4)
	})
})

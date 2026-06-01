import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { MoviesDataTable } from "./data-table"
import { MoviesPagination } from "./pagination"
import { WinnerFilter } from "./winner-filter"
import { YearFilter } from "./year-filter"

const mockPush = vi.hoisted(() => vi.fn())

const navigationState = vi.hoisted(() => ({
	searchParams: new URLSearchParams(),
}))

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
	usePathname: () => "/list",
	useSearchParams: () => navigationState.searchParams,
}))

vi.mock("./columns", () => ({
	getMoviesColumns: () => [
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }: { row: { original: { id: number } } }) => row.original.id,
		},
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }: { row: { original: { title: string } } }) =>
				row.original.title,
		},
		{
			accessorKey: "year",
			header: "Year",
			cell: ({ row }: { row: { original: { year: number } } }) => row.original.year,
		},
		{
			accessorKey: "winner",
			header: "Winner?",
			cell: ({ row }: { row: { original: { winner: boolean } } }) =>
				row.original.winner ? "Yes" : "No",
		},
	],
}))

const movies = [
	{
		id: 1,
		year: 1980,
		title: "Can't Stop the Music",
		studios: ["Associated Film Distribution"],
		producers: ["Allan Carr"],
		winner: true,
	},
	{
		id: 2,
		year: 1980,
		title: "Cruising",
		studios: ["United Artists"],
		producers: ["Jerry Weintraub"],
		winner: false,
	},
]

describe("MoviesList", () => {
	beforeEach(() => {
		mockPush.mockClear()
		navigationState.searchParams = new URLSearchParams()
	})

	describe("MoviesDataTable", () => {
		it("renders movie rows", () => {
			render(<MoviesDataTable movies={movies} page={0} totalPages={3} />)

			expect(screen.getByText("Can't Stop the Music")).toBeInTheDocument()
			expect(screen.getByText("Cruising")).toBeInTheDocument()
			expect(screen.getByText("Yes")).toBeInTheDocument()
			expect(screen.getByText("No")).toBeInTheDocument()
		})

		it("shows empty message when there are no movies", () => {
			render(<MoviesDataTable movies={[]} page={0} totalPages={0} />)

			expect(screen.getByText(/no movies found/i)).toBeInTheDocument()
		})
	})

	describe("MoviesPagination", () => {
		it("renders page links and navigation controls", () => {
			navigationState.searchParams = new URLSearchParams("page=1&year=1980")

			render(<MoviesPagination page={1} totalPages={5} />)

			expect(screen.getByRole("link", { name: /first page/i })).toHaveAttribute(
				"href",
				"/list?page=0&year=1980",
			)
			expect(
				screen.getByRole("link", { name: /previous page/i }),
			).toHaveAttribute("href", "/list?page=0&year=1980")
			expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
				"href",
				"/list?page=1&year=1980",
			)
			expect(screen.getByRole("link", { name: /next page/i })).toHaveAttribute(
				"href",
				"/list?page=2&year=1980",
			)
			expect(screen.getByRole("link", { name: /last page/i })).toHaveAttribute(
				"href",
				"/list?page=4&year=1980",
			)
		})

		it("disables previous controls on the first page", () => {
			render(<MoviesPagination page={0} totalPages={3} />)

			expect(screen.getByRole("link", { name: /first page/i })).toHaveAttribute(
				"href",
				"#",
			)
			expect(
				screen.getByRole("link", { name: /previous page/i }),
			).toHaveAttribute("href", "#")
		})
	})

	describe("YearFilter", () => {
		it("updates the URL with year filter on submit", async () => {
			navigationState.searchParams = new URLSearchParams("page=2")

			const user = userEvent.setup()
			render(<YearFilter />)

			const input = screen.getByPlaceholderText(/filter by year/i)
			await user.type(input, "1981")
			fireEvent.submit(input.closest("form")!)

			expect(mockPush).toHaveBeenCalledWith("/list?page=0&year=1981")
		})
	})

	describe("WinnerFilter", () => {
		it("updates the URL when winner filter changes", async () => {
			const user = userEvent.setup()
			render(<WinnerFilter />)

			await user.selectOptions(screen.getByRole("combobox"), "true")

			expect(mockPush).toHaveBeenCalledWith("/list?winner=true&page=0")
		})

		it("reflects the current winner filter value", () => {
			render(<WinnerFilter value={false} />)

			expect(screen.getByRole("combobox")).toHaveValue("false")
		})
	})
})

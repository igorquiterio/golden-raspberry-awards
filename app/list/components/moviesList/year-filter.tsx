"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

type YearFilterProps = {
	defaultValue?: number
}

export function YearFilter({ defaultValue }: YearFilterProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const year = formData.get("year")?.toString().trim()
		const params = new URLSearchParams(searchParams.toString())

		if (year) {
			params.set("year", year)
		} else {
			params.delete("year")
		}

		params.set("page", "0")
		router.push(`${pathname}?${params.toString()}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				name="year"
				type="number"
				placeholder="Filter by year"
				defaultValue={defaultValue ?? ""}
				className="h-8 mb-2"
			/>
		</form>
	)
}

"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

type WinnerFilterProps = {
	value?: boolean
}

export function WinnerFilter({ value }: WinnerFilterProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const selected = event.target.value
		const params = new URLSearchParams(searchParams.toString())

		if (selected === "") {
			params.delete("winner")
		} else {
			params.set("winner", selected)
		}

		params.set("page", "0")
		router.push(`${pathname}?${params.toString()}`)
	}

	return (
		<select
			value={value === undefined ? "" : String(value)}
			onChange={handleChange}
			className={cn(
				"flex h-8 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none mb-2",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
			)}
		>
			<option value="">All</option>
			<option value="true">Yes</option>
			<option value="false">No</option>
		</select>
	)
}

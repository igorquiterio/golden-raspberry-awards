"use server"

import type { ApiErrorResponse } from "./api-types"

const API_BASE = "https://challenge.outsera.tech/api/movies"

async function getUrl(
	path: string,
	queryParams?: Record<string, string>,
): Promise<URL> {
	const url = new URL(path.replace(/^\//, ""), `${API_BASE}/`)

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			url.searchParams.append(key, value)
		}
	}

	return url
}

type FetchOptions = {
	path?: string
	queryParams?: Record<string, string>
	tag?: string
	revalidate?: number | false
}

export async function fetchData<T>({
	path = "",
	queryParams,
	tag,
	revalidate = 0,
}: FetchOptions): Promise<T> {
	const response = await fetch(await getUrl(path, queryParams), {
		cache: tag ? "force-cache" : "no-store",
		next: tag ? { tags: [tag], revalidate } : undefined,
	})

	if (!response.ok) {
		const errorBody = (await response
			.json()
			.catch(() => null)) as ApiErrorResponse | null
		throw new Error(
			errorBody?.detail ?? errorBody?.message ?? response.statusText,
		)
	}

	return response.json() as Promise<T>
}

export async function toQueryParams(
	params: Record<string, string | number | boolean | undefined>,
): Promise<Record<string, string>> {
	return Object.fromEntries(
		Object.entries(params)
			.filter(([, value]) => value !== undefined)
			.map(([key, value]) => [key, String(value)]),
	)
}

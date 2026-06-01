export type ListPageProps = {
	searchParams: Promise<{
		page?: string
		winner?: string
		year?: string
	}>
}
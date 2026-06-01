export type MovieResponse = {
	id: number
	year: number
	title: string
	studios: string[]
	producers: string[]
	winner: boolean
}

export type PageMovieResponse = {
	content: MovieResponse[]
	totalPages: number
	totalElements: number
	number: number
	size: number
	numberOfElements: number
	first: boolean
	last: boolean
	empty: boolean
}

export type YearWithMultipleWinners = {
	year: number
	winnerCount: number
}

export type YearsWithMultipleWinnersResponse = {
	years: YearWithMultipleWinners[]
}

export type StudioCountPerWin = {
	name: string
	winCount: number
}

export type StudiosWithWinCountResponse = {
	studios: StudioCountPerWin[]
}

export type ProducerWithInterval = {
	producer: string
	interval: number
	previousWin: number
	followingWin: number
}

export type MaxMinWinIntervalForProducersResponse = {
	min: ProducerWithInterval[]
	max: ProducerWithInterval[]
}

export type ApiErrorResponse = {
	detail?: string
	message?: string
	title?: string
	status?: number | string
	instance?: string
}

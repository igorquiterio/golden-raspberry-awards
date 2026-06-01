import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Header } from "./components/header/header"
import { PageContainer } from "./components/page-container"
import { AppSidebar } from "./components/sidebar/sidebar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Golden Raspberry Awards",
	description: "Golden Raspberry Awards",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				"font-sans",
				inter.variable,
			)}
		>
			<body className="min-h-svh">
				<SidebarProvider
					data-app-shell=""
					className="flex min-h-svh w-full flex-col"
					style={
						{
							"--header-height": "2.5rem",
						} as CSSProperties
					}
				>
					<Header />
					<div className="flex min-h-0 w-full flex-1">
						<AppSidebar />
						<SidebarInset className="flex flex-1 flex-col">
							<PageContainer>{children}</PageContainer>
						</SidebarInset>
					</div>
				</SidebarProvider>
			</body>
		</html>
	)
}

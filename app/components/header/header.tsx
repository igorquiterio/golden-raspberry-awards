import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
	return (
		<header className="relative z-20 flex h-10 w-full shrink-0 items-center gap-3 border-b bg-zinc-950 px-4 text-white">
			<SidebarTrigger className="text-white hover:bg-zinc-800 hover:text-white" />
			<h1 className="text-sm font-medium sm:text-base">
				Frontend React Test - Igor Quiterio
			</h1>
		</header>
	)
}

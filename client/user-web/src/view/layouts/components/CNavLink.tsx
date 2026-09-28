import type { ReactNode } from "react"
import { NavLink } from "react-router"

interface CNavLinkProps {
	to: string
	children: ReactNode
}

export default function CNavLink({ to, children }: CNavLinkProps) {
	return (
		<div className="w-fit h-fit">
			<NavLink to={to}>{children}</NavLink>
		</div>
	)
}

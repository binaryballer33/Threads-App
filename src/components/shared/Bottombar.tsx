'use client'

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Bottombar() {
	const pathname = usePathname()

	return (
		<section className="bottombar">
			<div className="bottombar_container">
				{sidebarLinks.map((link) => {
					const notHomeRoute = link.route.length > 1 // If route is not '/'
					const isActive =
						(pathname.includes(link.route) && notHomeRoute) ||
						pathname === link.route

					return (
						<Link
							href={link.route}
							key={link.label}
							className={`bottombar_link ${isActive && 'bg-primary-500'}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{link.label.split(/\s+/)[0]}
							</p>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

export default Bottombar

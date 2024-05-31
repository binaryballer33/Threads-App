'use client'

import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LeftSidebar() {
	const pathname = usePathname()

	return (
		<section className="leftsidebar custom-scrollbar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6 justify-between">
				<div>
					{sidebarLinks.map((link) => {
						const notHomeRoute = link.route.length > 1 // If route is not '/'
						const isActive =
							(pathname.includes(link.route) && notHomeRoute) ||
							pathname === link.route

						return (
							<Link
								href={link.route}
								key={link.label}
								className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
							>
								<Image
									src={link.imgURL}
									alt={link.label}
									width={24}
									height={24}
								/>
								<p className="text-light-1 max-lg:hidden">{link.label}</p>
							</Link>
						)
					})}
				</div>

				<div>
					<SignedIn>
						<SignOutButton redirectUrl="/sign-in">
							<div className="flex cursor-pointer gap-4 p-4">
								<Image
									src="/assets/logout.svg"
									alt="logout"
									width={24}
									height={24}
								/>
								<p className="text-light-2 max-lg:hidden">Logout</p>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>
			</div>
		</section>
	)
}

export default LeftSidebar

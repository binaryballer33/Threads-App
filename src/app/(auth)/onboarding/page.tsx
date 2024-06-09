import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function Page() {
	const user = await currentUser()

	const userData = {
		id: user?.id as string,
		username: user?.username as string,
		name: user?.firstName as string,
		image: user?.imageUrl as string,
	}

	return (
		<main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
			<h1 className="head-text">Onboarding</h1>
			<p className="text-base-regular text-light-2 mt-3">
				Complete your onboarding now to use Threads
			</p>

			<section className="mt-9 p-10 bg-dark-2">
				<AccountProfile user={userData} />
			</section>
		</main>
	)
}

export default Page

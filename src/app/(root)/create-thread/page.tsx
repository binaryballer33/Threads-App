import PostThread from '@/components/forms/PostThread'
import { getUser } from '@/lib/actions/users/getUser.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function CreateThread() {
	const user = await currentUser()

	if (!user) return null
	const userInfo = await getUser(user.id)
	if (!userInfo.onboarded) redirect('/onboarding')

	return (
		<div>
			<h1 className="head-text">Create Thread</h1>

			<PostThread userId={userInfo._id} />
		</div>
	)
}

export default CreateThread

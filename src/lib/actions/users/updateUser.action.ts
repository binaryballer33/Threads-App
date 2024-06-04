'use server'

import { User } from '../../models/user.model'
import { connectToDB } from '../../mongoose'

interface UserParams {
	id: string
	username: string
	name: string
	image: string
	bio: string
}

export async function updateUser(values: UserParams): Promise<void> {
	const { id, username, name, image, bio } = values
	connectToDB()

	try {
		await User.findOneAndUpdate(
			{ id: id },
			{ username: username.toLowerCase(), name, image, bio, onboarded: true },
			{ upsert: true },
		)
	} catch (error) {
		throw new Error(`Error Creating/Updating User: ${error}`)
	}
}

'use server'

import { Thread } from '@/lib/models/thread.model'
import { connectToDB } from '../../mongoose'
import { User } from '@/lib/models/user.model'
import { revalidatePath } from 'next/cache'

interface ThreadParams {
	text: string
	author: string
	communityId: string | null
	path: string
}

export async function createThread(values: ThreadParams): Promise<void> {
	const { text, author, communityId, path } = values

	try {
		connectToDB()
		const createdThread = await Thread.create({
			text,
			author,
			communityId: null,
		})

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		})

		revalidatePath(path)
	} catch (error) {
		throw new Error(`Error Creating Thread: ${error}`)
	}
}

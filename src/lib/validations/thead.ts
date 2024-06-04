import * as z from 'zod'

export const ThreadValidation = z.object({
	thread: z.string().min(1, 'Thread Must Be At Least 1 Character Long'),
	accountId: z
		.string()
		.min(1, 'AccountId Must Be At Least 1 Character Long')
		.max(30, 'AccountId Must Be At Most 30 Characters Long'),
})

export const CommentValidation = z.object({
	thread: z.string().min(1, 'Thread Must Be At Least 1 Character Long'),
})

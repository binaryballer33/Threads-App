import * as z from 'zod'

export const UserValidation = z.object({
	profile_photo: z
		.string()
		.url()
		.min(1, 'Profile Photo Url Must Be At Least 1 Character Long'),
	name: z
		.string()
		.min(1, 'Name Must Be At Least 1 Character Long')
		.max(30, 'Name Must Be At Most 30 Characters Long'),
	username: z
		.string()
		.min(1, 'Username Must Be At Least 1 Character Long')
		.max(30, 'Username Must Be At Most 30 Characters Long'),
	bio: z
		.string()
		.min(1, 'Bio Must Be At Least 1 Character Long')
		.max(1000, 'Bio Must Be At Most 1000 Characters Long'),
})

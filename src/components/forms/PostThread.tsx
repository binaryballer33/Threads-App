'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
import { ThreadValidation } from '@/lib/validations/thead'
import { createThread } from '@/lib/actions/threads/createThread.action'

type PostThreadProps = {
	userId: string
}

function PostThread({ userId }: PostThreadProps) {
	const pathname = usePathname()
	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
			accountId: userId,
		},
	})

	async function handleSubmit(values: z.infer<typeof ThreadValidation>) {
		try {
			await createThread({
				text: values.thread,
				author: userId,
				communityId: null,
				path: pathname,
			})

			router.push('/')
		} catch (error) {
			console.error(`Error Posting Thread: ${error}`)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col gap-10 justify-start"
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-3 w-full">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
								<Textarea rows={15} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-primary-500">
					Post Thread
				</Button>
			</form>
		</Form>
	)
}

export default PostThread

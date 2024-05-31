import { clerkMiddleware } from '@clerk/nextjs/server'

//  might have to add a publicRoutes and ignoreRoutes to this, video was using authMiddleware which is deprecated
export default clerkMiddleware()

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

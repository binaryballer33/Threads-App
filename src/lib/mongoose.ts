import mongoose from 'mongoose'

let isConected = false

export async function connectToDB() {
	mongoose.set('strictQuery', true)

	if (!process.env.MONGODB_URL) console.log('MONGODB_URL Not Found In .env')
	if (isConected) console.log('Already Connected To DB')

	try {
		await mongoose.connect(process.env.MONGODB_URL!)
		isConected = true
		console.log('Connected To DB')
	} catch (error) {
		console.log(`Error Connecting To DB: ${error}`)
	}
}

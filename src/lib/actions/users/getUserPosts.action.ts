import { Thread } from "@/lib/models/thread.model";
import { User } from "../../models/user.model";
import { connectToDB } from "../../mongoose";
import { Community } from "@/lib/models/community.model";

export async function getUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const userWithThreads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
      ],
    });
    return userWithThreads;
  } catch (error) {
    console.error("Error Getting User Threads:", error);
    throw error;
  }
}

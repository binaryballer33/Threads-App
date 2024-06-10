"use server";

import { Community } from "@/lib/models/community.model";
import { Thread } from "@/lib/models/thread.model";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function getCommunityPosts(id: string) {
  try {
    connectToDB();

    const communityPosts = await Community.findById(id).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return communityPosts;
  } catch (error) {
    // Handle any errors
    console.error("Error Getting Community Posts:", error);
    throw error;
  }
}

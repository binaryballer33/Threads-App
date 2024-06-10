"use server";

import { Thread } from "@/lib/models/thread.model";
import { connectToDB } from "../../mongoose";
import { User } from "@/lib/models/user.model";

export async function getThreadById(threadId: string) {
  try {
    connectToDB();
    const thread = await Thread.findById(threadId)
      // TODO: populate the community later
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "_id id name parentId image" },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error) {
    throw new Error(`Error Getting Thread By ID: ${error}`);
  }
}

export default getThreadById;

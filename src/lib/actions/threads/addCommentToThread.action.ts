"use server";

import { Thread } from "@/lib/models/thread.model";
import { connectToDB } from "../../mongoose";
import { revalidatePath } from "next/cache";

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {
  try {
    connectToDB();

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) throw new Error(`Thread Not Found: ${threadId}`);

    // create the thread instance
    const createdComment = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // save the thread to the database
    const savedCommentThread = await createdComment.save();
    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Error Adding Comment To Thread ${threadId}: ${error}`);
  }
}

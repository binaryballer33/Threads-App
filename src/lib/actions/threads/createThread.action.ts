"use server";

import { Thread } from "@/lib/models/thread.model";
import { connectToDB } from "../../mongoose";
import { User } from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import { Community } from "@/lib/models/community.model";

interface ThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread(values: ThreadParams): Promise<void> {
  const { text, author, communityId, path } = values;

  try {
    connectToDB();

    const communityIdObject = await Community.findOne({ id: communityId }, { _id: 1 });

    const createdThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdThread._id },
      });
    }

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Error Creating Thread: ${error}`);
  }
}

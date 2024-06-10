import { Thread } from "@/lib/models/thread.model";
import { User } from "../../models/user.model";
import { connectToDB } from "../../mongoose";

export async function getActivity(userId: string) {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });

    // collect all the child thread ids ( replies ) from the children field
    const childThreadIds = userThreads.reduce((acc, thread) => {
      return acc.concat(thread.children);
    }, []);

    const replies = Thread.find({ _id: { $in: childThreadIds }, author: { $ne: userId } }).populate({
      path: "author",
      model: User,
      select: "name image _id id",
    });

    return replies;
  } catch (error) {
    throw new Error(`Error Getting User Activity: ${error}`);
  }
}

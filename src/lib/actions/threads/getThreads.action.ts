import { Thread } from "@/lib/models/thread.model";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function getThreads(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // This is the query to get all the threads that have no parent and paginate/sort them
    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] }, // get the threads that have no parent aka the original Thread
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User }) // get the author of the thread
      .populate({
        path: "author",
        model: User,
        select: "_id id name parentId image", // only get the id, name, and image of the author of each comment
      });

    // get the total count of all the threads that have no parent aka the original Thread
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    /*
     * execute the query to get the threads, its a promise so we have to await it,
     * its a query because we have not executed it yet because we did not await it when we called Thread.find({})
     * if you await Thread.find({}) it will return the threads and you can't execute it again for pagination purposes
     */
    const posts = await postQuery.exec();

    // check if there are more threads to get
    const isNext = totalPostsCount > skipAmount + posts.length;

    // return the posts and the isNext boolean for pagination purposes
    return { posts, isNext };
  } catch (error) {
    throw new Error(`Error Getting Threads: ${error}`);
  }
}

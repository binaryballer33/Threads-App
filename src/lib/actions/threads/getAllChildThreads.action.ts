import { Thread } from "@/lib/models/thread.model";

export async function getAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads: any[] = [];
  for (const childThread of childThreads) {
    const descendants = await getAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

import ThreadCard from "@/components/cards/ThreadCard";
import { getThreads } from "@/lib/actions/threads/getThreads.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { posts, isNext } = await getThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="flex flex-col mt-9 gap-10">
        {posts.length === 0 ? (
          <p className="no-result">No Threads</p>
        ) : (
          <>
            {posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id as string | ""}
                parentId={post.parentId}
                author={post.author}
                content={post.text}
                createdAt={post.createdAt}
                comments={post.comments}
                community={post.community}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

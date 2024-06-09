import { getUserPosts } from "@/lib/actions/users/getUserPosts.action";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

type ThreadsTabProps = {
  accountId: string;
  currentUserId: string;
  accountType: string;
};

async function ThreadsTab(props: ThreadsTabProps) {
  const { accountId, currentUserId, accountType } = props;
  const userWithPosts = await getUserPosts(accountId);

  if (!userWithPosts) redirect("/");

  return (
    <section className="flex flex-col mt-9 gap-10">
      {userWithPosts.threads.map((thread) => {
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            // author={thread.author}
            author={
              accountType === "User"
                ? { id: userWithPosts.id, name: userWithPosts.name, image: userWithPosts.image }
                : { id: thread.author?.id, name: thread.author?.name, image: thread.author?.image }
            }
            content={thread.text}
            createdAt={thread.createdAt}
            comments={thread.comments}
            community={thread.community}
          />
        );
      })}
    </section>
  );
}

export default ThreadsTab;

import { getUserPosts } from "@/lib/actions/users/getUserPosts.action";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { getCommunityPosts } from "@/lib/actions/communities/getCommunityPosts.action";

type ThreadsTabProps = {
  accountId: string;
  currentUserId: string;
  accountType: string;
};

async function ThreadsTab(props: ThreadsTabProps) {
  const { accountId, currentUserId, accountType } = props;
  let result: any;

  if (accountType === "Community") {
    result = await getCommunityPosts(accountId);
  } else {
    result = await getUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="flex flex-col mt-9 gap-10">
      {result.threads.map((thread) => {
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            // author={thread.author}
            author={
              accountType === "User"
                ? { id: result.id, name: result.name, image: result.image }
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

import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import getThreadById from "@/lib/actions/threads/getThreadById.action";
import { getUser } from "@/lib/actions/users/getUser.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type ThreadProps = {
  params: {
    id: string;
  };
};

async function Thread({ params }: ThreadProps) {
  const { id: threadId } = params;
  const user = await currentUser();

  if (!params.id) return null;
  if (!user) return null;

  const userInfo = await getUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await getThreadById(threadId);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id as string | ""}
          parentId={thread.parentId}
          author={thread.author}
          content={thread.text}
          createdAt={thread.createdAt}
          comments={thread.comments}
          community={thread.community}
        />
      </div>
      <div className="mt-7">
        <Comment threadId={threadId} currentUserImg={userInfo.image} currentUser={JSON.stringify(userInfo._id)} />
      </div>
      <div className="mt-10">
        {thread.children.map((comment) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id as string | ""}
            parentId={comment.parentId}
            author={comment.author}
            content={comment.text}
            createdAt={comment.createdAt}
            comments={comment.children}
            community={comment.community}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default Thread;

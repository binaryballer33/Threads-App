import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteThread from "../forms/DeleteThread";

type ThreadCardProps = {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    _id?: string;
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: Date;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
};

function ThreadCard(props: ThreadCardProps) {
  const { id, currentUserId, parentId, content, author, community, createdAt, comments, isComment = false } = props;

  return (
    <article className={`flex flex-col w-full p-7 rounded-xl ${isComment ? "xs:px-0 px-7" : "bg-dark-2"}`}>
      <div className="flex w-full flex-1 gap-4">
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative size-11">
            <Image src={author.image} alt="Profile Image" fill className="cursor-pointer rounded-full" />
          </Link>
          <div className="thread-card_bar" />
        </div>
        <div className="flex flex-col w-full">
          <Link href={`/profile/${author.id}`} className="w-fit">
            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
          </Link>
          <p className="text-small-regular text-light-2">{content}</p>

          <div className={`${isComment && "mb-10"} flex flex-col mt-5 gap-3`}>
            <div className="flex gap-3.5">
              <Image
                src={"/assets/heart-gray.svg"}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <Link href={`/thread/${id}`}>
                <Image
                  src={"/assets/reply.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </Link>
              <Image
                src={"/assets/repost.svg"}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
              <Image
                src={"/assets/share.svg"}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </div>

            {/* TODO: fix this, I think comments.length is zero, so its causing this not to work */}
            {isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
              </Link>
            )}
          </div>
        </div>
        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
        {/* TODO: functionality for showing comment logos */}
      </div>
      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt.toString())} -{community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="object-cover ml-1 rounded-full"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;

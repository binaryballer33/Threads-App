import { getActivity } from "@/lib/actions/users/getActivity.action";
import { getUser } from "@/lib/actions/users/getUser.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function ActivityPage() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="text-light-1 !text-small-regular">
                    <span className="mr-1 text-primary-500">{activity.author.name}</span> replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No Activity Yet</p>
        )}
      </section>
    </section>
  );
}

export default ActivityPage;

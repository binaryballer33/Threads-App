import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getUser } from "@/lib/actions/users/getUser.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCommunities } from "@/lib/actions/communities/getCommunities.action";
import CommunityCard from "@/components/cards/CommunityCard";

async function CommunitiesPage() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { communities, isNext } = await getCommunities({});

  return (
    <section className="mx-10">
      <h1 className="head-text mb-10">Communities Page</h1>
      <div className="mt-14 gap-9 flex flex-col">
        {communities.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default CommunitiesPage;

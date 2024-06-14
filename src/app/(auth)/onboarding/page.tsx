import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/users/getUser.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="text-base-regular text-light-2 mt-3">Complete your onboarding now to use Threads</p>

      <section className="mt-9 p-10 bg-dark-2">
        <AccountProfile user={userData} />
      </section>
    </main>
  );
}

export default Page;

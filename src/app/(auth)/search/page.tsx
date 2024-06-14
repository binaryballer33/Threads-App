import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/users/getAllUsers.action";
import { getUser } from "@/lib/actions/users/getUser.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function SearchPage() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { users, isNext } = await getAllUsers({
    userId: user.id,
    pageNumber: 1,
    pageSize: 25,
    sortBy: "desc",
    searchString: "",
  });

  return (
    <section className="mx-10">
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 gap-9 flex flex-col">
        {users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default SearchPage;

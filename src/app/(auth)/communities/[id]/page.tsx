import ProfileHeader from "@/components/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { getCommunityDetails } from "@/lib/actions/communities/getCommunityDetails.action";
import UserCard from "@/components/cards/UserCard";

type CommunityIdPageProps = {
  params: {
    id: string;
  };
};

async function CommunityIdPage({ params }: CommunityIdPageProps) {
  const { id: communityId } = params;
  const user = await currentUser();

  if (!params.id) return null;
  if (!user) return null;

  const communityDetails = await getCommunityDetails(communityId);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="tab">
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium">
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab accountId={communityDetails._id} currentUserId={user.id} accountType="Community" />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab accountId={communityDetails._id} currentUserId={user.id} accountType="Community" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default CommunityIdPage;

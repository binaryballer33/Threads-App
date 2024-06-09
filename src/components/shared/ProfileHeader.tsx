import Image from "next/image";
import React from "react";

type ProfileHeaderProps = {
  accountId: string;
  authUserId: string;
  name: String;
  username: string;
  imgUrl: string;
  bio: string;
};

function ProfileHeader(props: ProfileHeaderProps) {
  const { accountId, authUserId, name, username, imgUrl, bio } = props;
  return (
    <div className="flex flex-col w-full justify-start ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="size-20 relative object-cover">
            <Image src={imgUrl} alt="Profile Image" fill className="rounded-full object-cover shadow-2xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
            <p className="text-base-medium text-light-1">@{username}</p>
          </div>
        </div>
      </div>
      {/* TODO: Add Community Later */}
      <p className="mt-6 text-base-regular max-w-lg text-light-2">{bio}</p>
      <div className="bg-dark-3 h-0.5 mt-7 w-full" />
    </div>
  );
}

export default ProfileHeader;

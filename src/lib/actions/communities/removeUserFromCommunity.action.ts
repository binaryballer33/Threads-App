"use server";

import { Community } from "@/lib/models/community.model";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function removeUserFromCommunity(userId: string, communityId: string) {
  try {
    connectToDB();

    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const communityIdObject = await Community.findOne({ id: communityId }, { _id: 1 });

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!communityIdObject) {
      throw new Error("Community not found");
    }

    // Remove the user's _id from the members array in the community
    await Community.updateOne({ _id: communityIdObject._id }, { $pull: { members: userIdObject._id } });

    // Remove the community's _id from the communities array in the user
    await User.updateOne({ _id: userIdObject._id }, { $pull: { communities: communityIdObject._id } });

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from community:", error);
    throw error;
  }
}

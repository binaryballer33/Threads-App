"use server";

import { Community } from "@/lib/models/community.model";
import { connectToDB } from "@/lib/mongoose";

export async function updateCommunityInfo(communityId: string, name: string, username: string, image: string) {
  try {
    connectToDB();

    // Find the community by its _id and update the information
    const updatedCommunity = await Community.findOneAndUpdate({ id: communityId }, { name, username, image });

    if (!updatedCommunity) {
      throw new Error("Community not found");
    }

    return updatedCommunity;
  } catch (error) {
    // Handle any errors
    console.error("Error updating community information:", error);
    throw error;
  }
}

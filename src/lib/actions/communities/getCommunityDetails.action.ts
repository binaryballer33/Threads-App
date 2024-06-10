"use server";

import { Community } from "@/lib/models/community.model";
import { User } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function getCommunityDetails(id: string) {
  try {
    connectToDB();

    const communityDetails = await Community.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return communityDetails;
  } catch (error) {
    // Handle any errors
    console.error("Error Getting Community Details:", error);
    throw error;
  }
}

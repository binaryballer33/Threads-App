import { Community } from "@/lib/models/community.model";
import { User } from "../../models/user.model";
import { connectToDB } from "../../mongoose";

export async function getUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error) {
    throw new Error(`Error Getting User: ${error}`);
  }
}

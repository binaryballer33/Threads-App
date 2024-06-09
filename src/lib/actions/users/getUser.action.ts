import { User } from "../../models/user.model";
import { connectToDB } from "../../mongoose";

export async function getUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
  } catch (error) {
    throw new Error(`Error Getting User: ${error}`);
  }
}

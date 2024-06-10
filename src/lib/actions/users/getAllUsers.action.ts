import { FilterQuery, SortOrder } from "mongoose";
import { User } from "../../models/user.model";
import { connectToDB } from "../../mongoose";

type GetAllUsersProps = {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

// explanation https://www.youtube.com/watch?v=O5cmLDVTgAs 4:20:00
export async function getAllUsers(props: GetAllUsersProps) {
  const { pageNumber = 1, pageSize = 20, searchString, userId, sortBy = "desc" } = props;
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const sortOptions = { createdAt: sortBy };

    const regex = new RegExp(searchString as string, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString?.trim() !== "") {
      query.$or = [{ name: { $regex: regex } }, { username: { $regex: regex } }];
    }

    const userQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await userQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    throw new Error(`Error Getting All Users: ${error}`);
  }
}

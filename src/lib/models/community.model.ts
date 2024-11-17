import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  /* this is how you create a one to many relationship in mongoose,
   * has to be in the form of an array of objects ( one to many )
   * the ref is the name of the model you want to reference
   * the type is the type of the id in the referenced model
   */
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// if the model already exists, use it, otherwise create a new one
export const Community = mongoose.models?.Community || mongoose.model("Community", communitySchema);

import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  /* this is how you create a one-to-many relationship in mongoose,
   * has to be in the form of an array of objects ( one to many )
   * the ref is the name of the model you want to reference
   * the type is the type of the id in the referenced model
   */
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  /*
   * allows for nested comments, the children are the replies to the comment
   */
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

// if the model already exists, use it, otherwise create a new one
export const Thread = mongoose.models?.Thread || mongoose.model("Thread", threadSchema);

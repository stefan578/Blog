import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    date: { type: Date, required: true, default: Date.now },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    content: { type: [String], required: true },
    authorId: { type: String, required: false, index: true },
    authorName: { type: String, required: false, trim: true },
    authorImage: { type: String, required: false },
  },
  { timestamps: true },
);

const Post = models.Post || model("Post", PostSchema);
export default Post;

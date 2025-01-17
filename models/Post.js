import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      trime: true,
      minlength: 5,
      maxlength: 1000,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votesCounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);

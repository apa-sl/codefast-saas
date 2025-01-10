import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
    /* minLenght, default, etc */
  },
});

/* as mongoose.model("Board", boardSchema) will always create a model on every file run, we 1st have to check if the model already exists, if not then create */
export default mongoose.models.Board || mongoose.model("Board", boardSchema);

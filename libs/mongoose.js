import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    console.error("Mongoose error: " + e.message);
  }
};

export default connectMongoDB;

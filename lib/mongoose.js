import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connnected to MongoDB");
  } catch (error) {
    console.error("error connecting to MongoDB:", error);
  }
}

export default connect;

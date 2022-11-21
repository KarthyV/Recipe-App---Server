import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const Sessions = mongoose.model("Session", sessionSchema);

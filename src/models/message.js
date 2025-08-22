import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },   // or authorid: ObjectId if needed
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
 
import { Message } from "../../models/message.js";

export const messageQueryResolvers = {
  messages: async () => {
    return await Message.find().populate("author");
  },

  messagesofUser : async(_, { id }, )=>{
    return await Message.find({author: id}).sort({ createdAt: 1}).populate("author");
  }
};
 
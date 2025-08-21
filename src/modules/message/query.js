import { Message } from "../../models/message.js";

export const messageQueryResolvers = {
  messages: async () => {
    return await Message.find().populate("author");
  },
};
 
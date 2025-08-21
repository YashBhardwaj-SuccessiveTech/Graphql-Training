import { Message } from "../../models/message.js";
import { pubsub } from "../../server/pubsub.js";
import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  postMessage: async (_, { content, title }, { user }) => {
    if (!user) {
      throw new Error("authentication required");
    }
    const newMessage = new Message({
      content,
      author: user._id,
      title,
      createdAt: new Date().toISOString(),
    });
    await newMessage.save();
    pubsub.publish("MESSAGE_POSTED", { messagePosted: newMessage });
    return newMessage;
  },
};
      
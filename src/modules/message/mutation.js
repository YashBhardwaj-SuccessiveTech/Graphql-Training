import { Message } from "../../models/message.js";
import { User } from "../../models/user.js";
import { pubsub } from "../../server/pubsub.js";

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

  setUserOnline: async(_,{id},{pubsub})=>{
    const user = await User.findByIdAndUpdate(
      id, {isOnline: true},{ new: true}
    );
    await pubsub.publish("USER_STATUS_CHANGED",{ userstatuschanged: user});
    return user;
  },

  setUserOffline: async (_,{id},{pubsub})=>{
    const user = await User.findByIdAndUpdate(
      id,
      {isOnline: false},
      { new : true}
    );

    await pubsub.publish("USER_STATUS_CHANGED",{ userstatuschanged: user});
    return user;
  }
  
};
      
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { blogModule } from "../modules/blogging/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
  Query: {
    ...messageModule.Query,
    ...blogModule.Query,
  },

  Mutation: {
    ...messageModule.Mutation,
    ...blogModule.Mutation,
  },

  Subscription: {
    ...messageModule.Subscription,
    ...blogModule.Subscription,
  },

  User: {
    posts: async (parent) => {
      return await Post.find({ author: parent.id });
    },
    comments: async (parent) => {
      return await Comment.find({ author: parent.id });
    },
  },

  Post: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
    comments: async (parent) => {
      return await Comment.find({ post: parent.id });
    },
  },
 
  Comment: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
    post: async (parent) => {
      return await Post.findById(parent.post);
    },
  },

  Message: {
    author: async (parent) => {
      const user = await User.findById(parent.author);
      return user || null;
    },
  },

  UserResult: {
    __resolveType(obj) {
      if (obj.code) return "Error";
      return "User";
    },     
  },

  commentResult: {
    __resolveType(obj) {
      if (obj.code) return "Error";
      return "Comment";
    },     
  },
};

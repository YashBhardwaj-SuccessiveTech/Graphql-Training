import { Comment } from "../../models/comment.js";
import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";

export const blogQueryResolvers = {
  // to get all users
  users: async () => {
    return await User.find();
  },
  // getuserbyId : (_,{id}) => users.find((user)=> user.id === id),

  // now through loading state
  getuserbyId: async (_, { id }) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const user = await User.findById(id);
        if (!user) {
          resolve({ code: 404, message: "User not found" });
        } else {
          resolve(user);
        }
      }, 2000);
    });
  },

  posts: async () => {
    return await Post.find().populate("author").populate("comments");
  },

  getpostbyId: async (_, { id }) => {
    return await Post.findById(id).populate("author").populate("comments");
  },

  comments: async () => {
    return await Comment.find();
  },

  getcommentbyId: async (_, { id }) => {
    return await Comment.findById(id).populate("author").populate("post");
  },

  getpostbyuser: async (_, { id }) => {
    return await Post.find({ author: id }).populate("author").populate("comments");
  },

  getcommentbyuser: async(_, { id }) =>{
    return await Comment.find({author: id}).populate("author").populate("post");
  },

  postspaginated: async (_, { page, limit, sortBy = "id", order = "asc" }) => {
    // let sortedPosts = [...posts];

    // if (sortBy === "id") {
    //   sortedPosts.sort((a, b) =>
    //     order === "asc"
    //       ? Number(a.id) - Number(b.id)
    //       : Number(b.id) - Number(a.id)
    //   );
    // } else if (sortBy === "date") {
    //   sortedPosts.sort((a, b) => {
    //     const dateA = new Date(a.createdAt);
    //     const dateB = new Date(b.createdAt);
    //     order === "asc" ? dateA - dateB : dateB - dateA;
    //   });
    // }

    // const start = (page - 1) * limit;
    // const end = start + limit;
    // return sortedPosts.slice(start, end);

    const sortOrder = order === "asc" ? 1 : -1;

    return await Post.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author")
      .populate("comments");
  },
};

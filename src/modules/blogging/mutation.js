import { comments, posts, users } from "./dataSource.js";

export const blogMutationResolvers = {
  createpost: (_, { content, title, authorid }) => {
    const newPost = {
      id: String(posts.length + 1),
      title,
      content,
      authorid,
      createdAt:new Date().toISOString()
    };
    posts.push(newPost);
    return newPost;
  },

  createcomment: (_, { text, postid, authorid }) => {
    const newComment = {
      id: String(comments.length + 1),
      text,
      authorid,
      postid,
    };
    comments.push(newComment);
    return newComment;
  },

  updateUser: (_, { id, name, email }) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    if (name) user.name = name;
    if (email) user.email = email;
    return user;
  },

  deleteComment: (_, { id }) => {
    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Comment not found");
    }
    comments.splice(index, 1);
    return true; // return Boolean
  },
};

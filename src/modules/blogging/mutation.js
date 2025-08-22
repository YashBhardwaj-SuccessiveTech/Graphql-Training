import { Comment } from "../../models/comment.js";
import { Post } from "../../models/post.js";
import { User } from "../../models/user.js";
import { secretkey } from "../../server/express.js";
import { pubsub } from "../../server/pubsub.js";
// import { comments, posts, users } from "./dataSource.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const blogMutationResolvers = {
  createpost: async (_, { content, title, authorid }) => {
    const user = await User.findById(authorid);
    const newPost = new Post({
      title,
      content,
      author: authorid,
      comments: [],
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
 
    user.posts.push(newPost._id);
    await user.save();
    return newPost;
  },

  createcomment: async (_, { text, postid, authorid }) => {
    const user = await User.findById(authorid);
    const post = await Post.findById(postid);
    const newComment = new Comment({
      text,
      author: authorid,
      post: postid,
    });

    await newComment.save();
    post.comments.push(newComment._id);
    user.comments.push(newComment._id);
    await post.save();
    await user.save();

    pubsub.publish("COMMENT_POSTED", { commentposted: newComment });
    return newComment;
  },

  updateUser: async (_, { id, name, email, role }, { user }) => {
    if (user.role === "ADMIN") {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;
      await user.save();
      return {
        success: true,
        message: "User updated successfully",
        user,
      };
    }
    return {
      success: false,
      message:" Only admins are Authorized"
    }

  },

  deleteComment: async (_, { id }) => {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await Comment.findByIdAndDelete(id);
    return true; // return Boolean
  },

  registerUser: async (_, { name, email, password, role }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already registered");

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save(); 
    return newUser;
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    // return JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, secretkey, {
      expiresIn: "1h",
    });
    console.log(token);
    return token;
  },

  deleteUser: async (_, { id }, { user }) => {
    if (user.role === "ADMIN") {
      const existUser = await User.findById(id);
      if (!existUser) {
        console.log("user does not exist");
        throw new Error("User does not exist");
      }

      await User.findByIdAndDelete(id);
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
    return {
      success: false,
      message: "Only ADMIN is authorised",
    };
  },
};

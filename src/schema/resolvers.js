import { comments, posts, users } from "../modules/blogging/dataSource.js";
import { blogModule } from "../modules/blogging/index.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
  Query: {
    ...messageModule.Query,
    ...blogModule.Query,
  },
  Mutation: {
    ...messageModule.Mutation,
  },

  User: {
    posts: (parent) => {
      return posts.filter((post) => post.authorid === parent.id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.authorid === parent.id);
    },
  },

  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorid),
    comments: (parent) =>
      comments.filter((comment) => comment.postid === parent.id),
  },

  Comment: {
    author: (parent) => users.find((user) => user.id === parent.authorid),
    post: (parent) => posts.find((post) => post.id === parent.postid),
  },

  UserResult: {
    __resolveType(obj){
      if(obj.code) return "Error"
      return "User"
    }
  }
};


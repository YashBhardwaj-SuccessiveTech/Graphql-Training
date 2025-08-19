import { comments, posts, users } from "./dataSource.js";

export const blogQueryResolvers = {
  // to get all users
  users: () => users,
  // getuserbyId : (_,{id}) => users.find((user)=> user.id === id),

  // now through loading state
  getuserbyId: async (_, { id }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((user) => user.id === id);
        if (!user) {
          resolve({ code: 404, message: "User not found" });
        } else {
          resolve(user);
        }
      }, 2000);
    });
  },

  posts: () => posts,
  getpostbyId: (_, { id }) => posts.find((post) => post.id === id),

  comments: () => comments,
  getcommentbyId: (_, { id }) => comments.find((comment) => comment.id === id),

  getpostbyuser: (_, { id }) => posts.filter((post) => post.authorid === id),
  getcommentbyuser: (_, { id }) =>
    comments.filter((comment) => comment.authorid === id),

  postspaginated: (_, { page, limit, sortBy = "id", order = "asc" }) => {
    let sortedPosts = [...posts];

    if (sortBy === "id") {
      sortedPosts.sort((a, b) =>
        order === "asc"
          ? Number(a.id) - Number(b.id)
          : Number(b.id) - Number(a.id)
      );
    }else if(sortBy === "date"){
      sortedPosts.sort((a,b)=>{
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        order === "asc"? dateA- dateB : dateB-dateA
      });
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return sortedPosts.slice(start, end);
  },
};

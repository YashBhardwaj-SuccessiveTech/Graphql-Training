import { comments, posts, users } from "./dataSource.js";

export const blogQueryResolvers = {
    // to get all users
    users: () => users,
    getuserbyId : (_,{id}) => users.find((user)=> user.id === id),

    posts: ()=> posts,
    getpostbyId: (_,{id})=> posts.find((post)=> post.id === id),

    comments: ()=> comments,
    getcommentbyId: (_,{id})=> comments.find((comment)=> comment.id === id),

    getpostbyuser: (_,{id})=> posts.filter((post)=> post.authorid === id),
    getcommentbyuser: (_, {id})=> comments.filter((comment)=> comment.authorid === id)
};


export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

export const posts = [
  {
    id: "101",
    title: "GraphQL Basics",
    content: "This post explains the basics of GraphQL.",
    authorid: "1"
  },
  {
    id: "102",
    title: "Advanced GraphQL Queries",
    content: "This post covers advanced query techniques in GraphQL.",
    authorid: "2"
  },
  {
    id: "103",
    title: "Introduction to REST APIs",
    content: "Learn about RESTful API design and its principles.",
    authorid: "1"
  },
];


export const comments = [
  {
    id: "1001",
    text: "Great post! I learned a lot.",
    authorid: "2",
    postid: "101",
  },
  {
    id: "1002",
    text: "Looking forward to reading more about this topic.",
    authorid: "1",
    postid: "101",
  },
  {
    id: "1003",
    text: "This helped me understand REST APIs better. Thanks!",
    authorid: "1",
    postid: "102",
  },
];

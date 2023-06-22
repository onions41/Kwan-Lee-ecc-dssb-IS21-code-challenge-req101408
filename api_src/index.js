// Imports
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "react_frontend", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "react_frontend", "build", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



// app.use(express.static(path.join(__dirname, "build")));

// -app.get('/', function (req, res) {
// +app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

// Endpoint to retrieve all blog posts
// app.get("/posts", (req, res) => {
//   // Logic to fetch all blog posts from the database
//   const posts = [
//     { id: 1, title: "First Blog Post" },
//     { id: 2, title: "Second Blog Post" },
//     { id: 3, title: "Third Blog Post" }
//   ];
//   res.json(posts);
// });

// // Endpoint to retrieve a specific blog post by ID
// app.get("/posts/:id", (req, res) => {
//   const postId = req.params.id;
//   // Logic to fetch the blog post from the database based on the ID
//   const post = { id: postId, title: "Sample Blog Post" };
//   res.json(post);
// });

// // Endpoint to create a new blog post
// app.post("/posts", (req, res) => {
//   // Logic to create a new blog post based on the data in the request body
//   const newPost = { id: 4, title: "New Blog Post" };
//   res.json(newPost);
// });

// // Endpoint to update an existing blog post by ID
// app.put("/posts/:id", (req, res) => {
//   const postId = req.params.id;
//   // Logic to update the blog post in the database based on the ID and the data in the request body
//   const updatedPost = { id: postId, title: "Updated Blog Post" };
//   res.json(updatedPost);
// });

// // Endpoint to delete a blog post by ID
// app.delete("/posts/:id", (req, res) => {
//   const postId = req.params.id;
//   // Logic to delete the blog post from the database based on the ID
//   res.sendStatus(204); // 204 No Content
// });
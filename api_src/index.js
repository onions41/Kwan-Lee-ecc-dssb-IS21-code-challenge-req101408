// Imports
const express = require("express");
const path = require("path");
const mockData = require("./mockData");

const app = express();

// CORS. Only needed during development
// undefined in production build
if (process.env.REACT_CLIENT_ORIGIN) {
  const cors = require("cors");
  app.use(
    cors({
      origin: process.env.REACT_CLIENT_ORIGIN
    })
  );
}

// Serves static files required by the frontend
app.use(express.static(path.join(__dirname, "..", "react_frontend", "build")));
// Parses JSON bodies
app.use(express.json());
// Serves frontend bundled JavaScript
app.get("/", function (_req, res) {
  res.sendFile(path.join(__dirname, "..", "react_frontend", "build", "index.html"));
});

// Read all products
app.get("/api/product", function (_req, res) {
  try {
    res.status(200).json(mockData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new product
app.post("/api/product", function (req, res) {
  try {
    // TODO: Validate request body, should fit data shape. throw error if not
    mockData.push(req.body);
    res.send(200).json({ wasSuccessful: true, data: req.body });
  } catch (error) {
    res.status(400).json({ wasSuccessful: false, error });
  }
});

// Catch all for unused routes and verbs
app.use((_req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(3000, () => {
  console.log("API is running on port 3000");
});

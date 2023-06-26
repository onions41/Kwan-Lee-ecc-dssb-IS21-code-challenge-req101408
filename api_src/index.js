const express = require("express");
const path = require("path");
const mockData = require("./mockData");
const crypto = require("crypto");

// Initializes server
const app = express();

// Adding middleware

// CORS. Only used during development
// REACT_CLIENT_ORIGIN is undefined in production build
if (process.env.REACT_CLIENT_ORIGIN) {
  const cors = require("cors");
  app.use(
    cors({
      origin: process.env.REACT_CLIENT_ORIGIN
    })
  );
}

// Parses JSON in request body
app.use(express.json());

// Serving the frontend application

// Serves static files required by the frontend
app.use(express.static(path.join(__dirname, "..", "react_frontend", "build")));
// Serves frontend bundled JavaScript
app.get("/", function (_req, res) {
  res.sendFile(path.join(__dirname, "..", "react_frontend", "build", "index.html"));
});

// Defining API endpoints

// Get all products
app.get("/api/product", function (_req, res) {
  try {
    // Healthy response. Sends back mock data in response as JSON
    res.status(200).json(mockData);
  } catch (error) {
    // Server error. Sends back error message in response
    res.status(500).send(error.message);
  }
});

// Create a new product
app.post("/api/product", function (req, res) {
  try {
    // Form data validation would go here
    
    // Generate a product ID for the new product
    req.body.productId = crypto.randomUUID();
    // Add the new product to the mock database
    mockData.splice(0, 0, req.body);
    // Respond with the new product that now has a product ID
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Edit an existing product
app.put("/api/product/:productId", function (req, res) {
  try {
    // TODO: Validate request body, should fit data shape. throw error if not
    const index = mockData.findIndex((row) => row.productId === req.params.productId);
    if (index === -1) {
      throw new Error("Could not find an existing product with matching Product Number");
    }
    mockData[index] = { ...mockData[index], ...req.body };
    res.status(200).json({ wasSuccessful: true, data: mockData[index] });
  } catch (error) {
    res.status(400).json({ wasSuccessful: false, error });
  }
});

// Catch all for unused routes and verbs
app.use((_req, res) => {
  res.status(404).send("404 - Not Found");
});

// Starting the server

// Listen on port 3000
app.listen(3000, () => {
  console.log("API is running on port 3000");
});

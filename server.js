const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { swaggerUi, swaggerSpec } = require("./swagger/config");
const booksRoutes = require("./routes/books");
const connectDB = require("./config/database");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON payloads
app.use(cors());

// Create a new router instance
const router = express.Router();

// Define a simple route for the root
router.get("/", (_, res) => {
    res.send("Server is up and running!");
});

// Use the router
app.use("/", router);

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Book routes
app.use("/books", booksRoutes);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

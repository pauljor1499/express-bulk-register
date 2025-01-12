const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { swaggerUi, swaggerSpec } = require("./swagger/config");
const connectDB = require("./config/database");
const booksRoutes = require("./routes/books.js");
const usersRoutes = require("./routes/users.js");
const teacherRoutes = require("./routes/teachers.js");
const studentRoutes = require("./routes/students.js");

dotenv.config();
const app = express();
const router = express.Router();
connectDB();

router.get("/", (_, res) => {
    res.send("Server is up and running!");
});

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/books", booksRoutes);
app.use("/users", usersRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

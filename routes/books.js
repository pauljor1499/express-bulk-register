const express = require("express");
const multer = require("multer");
require("../swagger/books");
const bookService = require("../services/bookService");
const router = express.Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory instead of disk
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Please upload an Excel file."));
        }
        cb(null, true);
    },
});

// Route for uploading a file and creating multiple books
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // Pass the file buffer to the service
        await bookService.createBooksFromExcel(req.file.buffer);

        res.status(201).json({ message: "Books uploaded and created successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Other routes
router.get("/", async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await bookService.deleteBook(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

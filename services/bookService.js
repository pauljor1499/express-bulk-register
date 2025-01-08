const Book = require("../models/bookModel");
const xlsx = require("xlsx");

// Get all books
const getAllBooks = async () => {
    return await Book.find();
};

// Get a book by ID
const getBookById = async (id) => {
    return await Book.findById(id);
};

// Create a new book
const createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

const createBooksFromExcel = async (filePath) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        console.log("sheetData", sheetData);

        // Iterate over the data and create books
        const createPromises = sheetData.map(async (book) => {
            const bookData = {
                title: book.title,
                author: book.author,
                publishedDate: book.publishedDate || new Date(),
            };
            return await createBook(bookData);
        });

        // Wait for all books to be created
        const createdBooks = await Promise.all(createPromises);
        console.log("Books created successfully:", createdBooks);
    } catch (error) {
        console.error("Error creating books from Excel file:", error);
    }
};

// Update a book
const updateBook = async (id, bookData) => {
    return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

// Delete a book
const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    createBooksFromExcel,
    updateBook,
    deleteBook,
};

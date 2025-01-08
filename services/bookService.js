const Book = require("../models/bookModel");

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
    updateBook,
    deleteBook,
};

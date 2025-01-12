const Student = require("../models/studentModel.js");
const xlsx = require("xlsx");

const getAllStudents = async () => {
    return await Student.find();
};

const getStudentById = async (id) => {
    return await Student.findById(id);
};

const createStudent = async (bookData) => {
    const student = new Student(bookData);
    return await student.save();
};

const createStudentsFromExcel = async (fileBuffer) => {
    try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        console.log("sheetData", sheetData);

        // Iterate over the data and create books
        const createPromises = sheetData.map(async (book) => {
            const bookData = {
                first_name: book.first_name,
                middle_name: book.middle_name,
                last_name: book.email,
                email: book.email,
            };
            return await createStudent(bookData);
        });

        // Wait for all books to be created
        const createdBooks = await Promise.all(createPromises);
        console.log("Books created successfully:", createdBooks);
    } catch (error) {
        console.error("Error creating books from Excel file:", error);
    }
};

const updateStudent = async (id, bookData) => {
    return await Student.findByIdAndUpdate(id, bookData, { new: true });
};

const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    createStudentsFromExcel,
    updateStudent,
    deleteStudent,
};

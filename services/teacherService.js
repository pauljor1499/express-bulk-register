const Teacher = require("../models/teacherModel.js");
const xlsx = require("xlsx");

const getAllTeachers = async () => {
    return await Teacher.find();
};

const getTeacherById = async (id) => {
    return await Teacher.findById(id);
};

const createTeacher = async (bookData) => {
    const teacher = new Teacher(bookData);
    return await teacher.save();
};

const createTeachersFromExcel = async (fileBuffer) => {
    try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        // Iterate over the data and create books
        const createPromises = sheetData.map(async (book) => {
            const bookData = {
                first_name: book.first_name,
                middle_name: book.middle_name,
                last_name: book.email,
                email: book.email,
            };
            return await createTeacher(bookData);
        });

        // Wait for all books to be created
        const createdBooks = await Promise.all(createPromises);
        console.log("Books created successfully:", createdBooks);
    } catch (error) {
        console.error("Error creating books from Excel file:", error);
    }
};

const updateTeacher = async (id, bookData) => {
    return await Teacher.findByIdAndUpdate(id, bookData, { new: true });
};

const deleteTeacher = async (id) => {
    return await Teacher.findByIdAndDelete(id);
};

module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    createTeachersFromExcel,
    updateTeacher,
    deleteTeacher,
};

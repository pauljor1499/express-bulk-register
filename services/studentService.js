const Student = require("../models/studentModel.js");
const xlsx = require("xlsx");

const getAllStudents = async () => {
    return await Student.find();
};

const getStudentById = async (id) => {
    return await Student.findById(id);
};

const createStudent = async (studentData) => {
    const student = new Student(studentData);
    return await student.save();
};

const createStudentsFromExcel = async (fileBuffer) => {
    try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        // Iterate over the data and create students
        const createPromises = sheetData.map(async (student) => {
            const studentData = {
                first_name: student.first_name,
                middle_name: student.middle_name,
                last_name: student.email,
                email: student.email,
            };
            return await createStudent(studentData);
        });

        // Wait for all students to be created
        // const createdStudents = await Promise.all(createPromises);
        // console.log("Students created successfully:", createdStudents);
    } catch (error) {
        console.error("Error creating students from Excel file:", error);
    }
};

const updateStudent = async (id, studentData) => {
    return await Student.findByIdAndUpdate(id, studentData, { new: true });
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

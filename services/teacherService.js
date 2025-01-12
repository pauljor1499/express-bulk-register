const Teacher = require("../models/teacherModel.js");
const xlsx = require("xlsx");

const getAllTeachers = async () => {
    return await Teacher.find();
};

const getTeacherById = async (id) => {
    return await Teacher.findById(id);
};

const createTeacher = async (teacherData) => {
    const teacher = new Teacher(teacherData);
    return await teacher.save();
};

const createTeachersFromExcel = async (fileBuffer) => {
    try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        const totalTeachers = sheetData.length; // Total number of teachers
        let successfulUploads = 0; // Counter for successful uploads

        // Iterate over the data and create teachers
        const createPromises = sheetData.map(async (teacher) => {
            try {
                const teacherData = {
                    first_name: teacher.first_name,
                    middle_name: teacher.middle_name,
                    last_name: teacher.last_name,
                    email: teacher.email,
                    role: teacher.role,
                };
                await createTeacher(teacherData);
                successfulUploads++; // Increment on successful creation
            } catch (err) {
                console.error(`Error creating teacher: ${teacher.email}`, err);
            }
        });

        // Wait for all teacher creation operations to finish
        await Promise.all(createPromises);
        console.log(`${successfulUploads}/${totalTeachers} teachers uploaded successfully.`);
        return { successfulUploads, totalTeachers }; // Optionally return the result
    } catch (error) {
        console.error("Error creating teachers from Excel file:", error);
        throw error; // Re-throw the error if needed
    }
};

const updateTeacher = async (id, teacherData) => {
    return await Teacher.findByIdAndUpdate(id, teacherData, { new: true });
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

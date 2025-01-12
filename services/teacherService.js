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

        // Iterate over the data and create teachers
        const createPromises = sheetData.map(async (teacher) => {
            const teacherData = {
                first_name: teacher.first_name,
                middle_name: teacher.middle_name,
                last_name: teacher.email,
                email: teacher.email,
            };
            return await createTeacher(teacherData);
        });

        // Wait for all teacher to be created
        // const createdTeachers = await Promise.all(createPromises);
        // console.log("Teachers created successfully:", createdTeachers);
    } catch (error) {
        console.error("Error creating teachers from Excel file:", error);
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

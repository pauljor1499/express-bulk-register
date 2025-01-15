const Teacher = require("../models/teacherModel.js");
const xlsx = require("xlsx");

// First name validation regex:
// ^                  -> Ensures the start of the string.
// [A-Za-z\s]         -> Allows uppercase (A-Z), lowercase (a-z), and spaces.
// {1,25}             -> Enforces a minimum length of 1 character and a maximum of 25 characters.
// $                  -> Ensures the end of the string.
const nameRegex = /^[A-Za-z\s]{1,25}$/;

// Email validation regex:
// ^[a-zA-Z0-9._%+-]{1,25}   -> Local part: Starts with alphanumeric characters and can include `._%+-`, with a length between 1 and 25 characters.
// @                        -> Ensures the presence of "@" symbol separating the local and domain parts.
// [a-zA-Z0-9.-]{1,25}       -> Domain part: Allows alphanumeric characters, dots, and hyphens, with a length between 1 and 25 characters.
// \.[a-zA-Z]{2,}$           -> TLD: Ensures the domain ends with a period and at least 2 alphabetical characters.
const emailRegex = /^[a-zA-Z0-9._%+-]{1,25}@[a-zA-Z0-9.-]{1,25}\.[a-zA-Z]{2,}$/;

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
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

        const totalTeachers = sheetData.length; // Total number of teachers
        let successfulUploads = 0;
        const successfulUploadNames = [];
        const unsuccessfulUploadNames = [];

        const createPromises = sheetData.map(async (teacher) => {
            const reasons = [];

            if (!nameRegex.test(teacher.first_name)) {
                reasons.push("First name is invalid");
            }

            if (!nameRegex.test(teacher.middle_name)) {
                reasons.push("Middle name is invalid");
            }

            if (!nameRegex.test(teacher.last_name)) {
                reasons.push("Last name is invalid");
            }

            if (teacher.role !== "teacher") {
                reasons.push("Role is not teacher");
            }

            if (!emailRegex.test(teacher.email)) {
                reasons.push("Email is invalid");
            }

            if (reasons.length > 0) {
                console.warn(`Skipping user: ${teacher.email}. Reasons: ${reasons.join(", ")}`);
                unsuccessfulUploadNames.push({
                    first_name: teacher.first_name,
                    middle_name: teacher.middle_name,
                    last_name: teacher.last_name,
                    email: teacher.email,
                    role: teacher.role,
                    reasons,
                });
                return;
            }

            try {
                const teacherData = {
                    first_name: teacher.first_name,
                    middle_name: teacher.middle_name,
                    last_name: teacher.last_name,
                    email: teacher.email,
                    role: teacher.role,
                };
                await createTeacher(teacherData);
                successfulUploads++;
                successfulUploadNames.push({ ...teacherData });
            } catch (err) {
                console.error(`Error creating teacher: ${teacher.email}`, err);
                unsuccessfulUploadNames.push({
                    first_name: teacher.first_name,
                    middle_name: teacher.middle_name,
                    last_name: teacher.last_name,
                    email: teacher.email,
                    role: teacher.role,
                    reasons: ["Failed to create teacher in the system"],
                });
            }
        });

        // Wait for all teacher creation operations to finish
        await Promise.all(createPromises);

        return {
            successfulUploads,
            totalTeachers,
            successfulUploadNames,
            unsuccessfulUploadNames,
        };
    } catch (error) {
        console.error("Error creating teachers from Excel file:", error);
        throw error;
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

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        middle_name: { type: String, required: false },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
    },
    { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

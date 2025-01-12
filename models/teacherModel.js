const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        middle_name: { type: String, required: false },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
    },
    { versionKey: false }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;

require("../swagger/teachers");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const teacherService = require("../services/teacherService.js");

const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory instead of disk
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Please upload an Excel file."));
        }
        cb(null, true);
    },
});

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        await teacherService.createTeachersFromExcel(req.file.buffer);

        res.status(201).json({ message: "Teachers uploaded and created successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const teacher = await teacherService.getTeacherById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const teacher = await teacherService.createTeacher(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const teacher = await teacherService.updateTeacher(req.params.id, req.body);
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await teacherService.deleteTeacher(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         const filePath = req.file.path;

//         // Assuming teacherService has a method to process the file
//         const result = await teacherService.processTeacherExcel(filePath);

//         res.status(201).json({ message: "Teachers created successfully", data: result });
//     } catch (error) {
//         if (error instanceof teacherService.InvalidFileError) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(500).json({ error: error.message });
//         }
//     }
// });

module.exports = router;

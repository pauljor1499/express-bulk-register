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

        const startTime = Date.now();
        const response = await teacherService.createTeachersFromExcel(req.file.buffer);
        const endTime = Date.now();
        const processTime = endTime - startTime; // milliseconds

        res.status(201).json({
            message: "Teachers uploaded and created successfully.",
            processTime: `${processTime} ms`,
            result: `${response.successfulUploads}/${response.totalTeachers}`,
            successfulUploadNames: response.successfulUploadNames,
            unsuccessfulUploadNames: response.unsuccessfulUploadNames,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/fetch", async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id/specific/fetch", async (req, res) => {
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

router.post("/create", async (req, res) => {
    try {
        const teacher = await teacherService.createTeacher(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id/specific/update", async (req, res) => {
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

router.delete("/:id/specific/delete", async (req, res) => {
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

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Students API
 *   description: API for managing student
 */

/**
 * @swagger
 * /student:
 *   get:
 *     tags: [Students API]
 *     summary: Get all student
 *     responses:
 *       200:
 *         description: List of all student
 */

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     tags: [Students API]
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The student's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The student with the specified ID
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students API]
 *     description: Add a new student to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the student
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the student
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the student
 *                 example: "Fiction"
 *               price:
 *                 type: number
 *                 description: The price of the student
 *                 example: 15.99
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the student
 *                 example: "1925-04-10"
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /student/upload:
 *   post:
 *     summary: Upload an Excel file to create multiple student
 *     tags: [Students API]
 *     description: Upload an Excel file to add multiple student to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The Excel file containing student data
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid file or format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students API]
 *     description: Update a student's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The student's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the student
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the student
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the student
 *                 example: "Fiction"
 *               price:
 *                 type: number
 *                 description: The price of the student
 *                 example: 15.99
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the student
 *                 example: "1925-04-10"
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The student's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

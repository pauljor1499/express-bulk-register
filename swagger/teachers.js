/**
 * @swagger
 * tags:
 *   name: Teachers API
 *   description: API for managing teacher
 */

/**
 * @swagger
 * /teacher:
 *   get:
 *     tags: [Teachers API]
 *     summary: Get all teacher
 *     responses:
 *       200:
 *         description: List of all teacher
 */

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     tags: [Teachers API]
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The teacher's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The teacher with the specified ID
 *       404:
 *         description: Teacher not found
 */

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers API]
 *     description: Add a new teacher to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the teacher
 *                 example: "John"
 *               middle_name:
 *                 type: string
 *                 description: The middle name of the teacher
 *                 example: "Ford"
 *               last_name:
 *                 type: string
 *                 description: The last name of the teacher
 *                 example: "Waltz"
 *               email:
 *                 type: string
 *                 description: The email of the teacher
 *                 example: teacher@gmail.com
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teacher/upload:
 *   post:
 *     summary: Upload an Excel file to create multiple teacher
 *     tags: [Teachers API]
 *     description: Upload an Excel file to add multiple teacher to the database.
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
 *                 description: The Excel file containing teacher data
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Invalid file or format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teacher/{id}:
 *   put:
 *     summary: Update a teacher
 *     tags: [Teachers API]
 *     description: Update a teacher's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The teacher's ID
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
 *                 description: The title of the teacher
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the teacher
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the teacher
 *                 example: "Fiction"
 *               price:
 *                 type: number
 *                 description: The price of the teacher
 *                 example: 15.99
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the teacher
 *                 example: "1925-04-10"
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teachers API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The teacher's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */

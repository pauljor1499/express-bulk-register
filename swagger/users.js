/**
 * @swagger
 * tags:
 *   name: Users API
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users API]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users API]
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book with the specified ID
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new book
 *     tags: [Users API]
 *     description: Add a new book to the database
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
 *                 description: The title of the book
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Fiction"
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 example: 15.99
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the book
 *                 example: "1925-04-10"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/upload:
 *   post:
 *     summary: Upload an Excel file to create multiple users
 *     tags: [Users API]
 *     description: Upload an Excel file to add multiple users to the database. If `publishedDate` is not provided in the file, it will default to the current date and time.
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
 *                 description: The Excel file containing book data
 *     responses:
 *       201:
 *         description: Users created successfully
 *       400:
 *         description: Invalid file or format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Users API]
 *     description: Update a book's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's ID
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
 *                 description: The title of the book
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Fiction"
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 example: 15.99
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the book
 *                 example: "1925-04-10"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Users API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

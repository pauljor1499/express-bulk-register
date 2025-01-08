/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of all books
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
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
 * /books:
 *   post:
 *     summary: Create a new book
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
 * /books/{id}:
 *   put:
 *     summary: Update a book
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
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
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

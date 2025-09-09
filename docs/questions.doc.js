
/**
 * @openapi
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, category]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Unable to create question
 */

/**
 * @openapi
 * /questions/search:
 *   get:
 *     summary: Search questions by title or category
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching questions
 *       500:
 *         description: Unable to fetch questions
 */

/**
 * @openapi
 * /questions/{questionId}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question data
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to fetch question
 *   put:
 *     summary: Update a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               category: { type: string }
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to update question
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       500:
 *         description: Unable to delete question
 */

/**
 * @openapi
 * /questions/{questionId}/answers:
 *   get:
 *     summary: Get all answers for a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of answers
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to fetch answers
 *   post:
 *     summary: Create an answer for a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       500:
 *         description: Unable to create answer
 *   delete:
 *     summary: Delete all answers for a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All answers deleted successfully
 *       500:
 *         description: Unable to delete answers
 */

/**
 * @openapi
 * /questions/{questionId}/vote:
 *   post:
 *     summary: Vote on a question (+1 / -1)
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vote]
 *             properties:
 *               vote:
 *                 type: integer
 *                 enum: [-1, 1]
 *     responses:
 *       200:
 *         description: Vote recorded successfully
 *       500:
 *         description: Unable to vote on question
 */

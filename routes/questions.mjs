import { Router } from "express"
import connectionPool from "../utils/db.mjs"
import { validateCreateQuestionData, validateUpdateQuestionData } from "../middleswares/question.validation.mjs";
import { validateCreateAnswerData } from "../middleswares/answer.validation.mjs";
import { validateVote } from "../middleswares/vote.validation.mjs";

const questionRouter = Router();

// User can create new question
questionRouter.post('/',[validateCreateQuestionData], async (req, res) => {
  const newQuestion = {
    ...req.body,
  }
    try {
      await connectionPool.query(
        `insert into questions (title, description, category)
        values ($1, $2, $3)`,
        [
          newQuestion.title,
          newQuestion.description,
          newQuestion.category,
        ]
      )
      return res.status(201).json({
        message: "Question created successfully."
      })
    } catch (error) {
      return res.status(500).json({
        message: "Unable to create question.",
        error: error.message
      })
    }
})

// User can get all questions
questionRouter.get('/', async (req, res) => {
  let queryRes;
  try {
    queryRes = await connectionPool.query('select * from questions');
  } catch {
    return res.status(500).json({
      message: "Unable to fetch questions."
    })
  }
  return res.status(200).json({
    data: queryRes.rows
  });
})

// User can search questions by title or category
questionRouter.get("/search", async (req, res) => {
  let results;

  const title = req.query.title || '';
  const category = req.query.category || '';

  try {
    results = await connectionPool.query(
     `select *
      from questions
      where ($1 = '' OR title ILIKE '%' || $1 || '%')
        and ($2 = '' OR category ILIKE '%' || $2 || '%')`,
      [title, category]
    )
  } catch {
    return res.status(500).json({
      message: "Server could not read post because database issue"
    })
  }
  return res.status(200).json({
    data: results.rows
  })
})

// User can get a question by ID
questionRouter.get('/:questionId', async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  let results;
  try {
  results = await connectionPool.query(
    `select * from questions where id=$1`,
    [questionIdFromClient]
  )

  if (!results.rows[0]) {
    return res.status(404).json({
      message: "Question not found.",
      })
    }
  } catch {
    return res.status(500).json({
      message: "Unable to fetch questions."
    })
  }
  return res.status(200).json({
    data: results.rows[0]
  })
})

// User can update a question by ID
questionRouter.put('/:questionId', [validateUpdateQuestionData], async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  const updatedQuestion = {...req.body}

  try {
    const results = await connectionPool.query(
      `
        update questions
        set title = $2,
            description = $3,
            category = $4
          where id = $1
      `, [
        questionIdFromClient,
        updatedQuestion.title,
        updatedQuestion.description,
        updatedQuestion.category,
      ]
    )

    if (results.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found."
      })
    }

  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch questions.",
      error: error.message
    })
  }
  return res.status(200).json({
    message: "Question updated successfully."
  })
})

// User can delete question by ID
questionRouter.delete('/:questionId', async (req, res) => {
  const questionIdFromClient = req.params.questionId;

  try {
    await connectionPool.query(
      `
      delete from questions
      where id = $1
      `, [questionIdFromClient]
    )

    return res.status(200).json({
      message: "Question post has been deleted successfully."
    })
  } catch {
    return res.status(500).json({
      message: "Unable to delete question."
    })
  }
})

// User can get answers for a question
questionRouter.get('/:questionId/answers', async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  let results;

  try {
   results = await connectionPool.query(
    `select * from answers where question_id=$1`,
    [questionIdFromClient]
  );

  if (!results.rows[0]) {
    return res.status(404).json({
      message: "Question not found."
    })
  }
  } catch {
  return res.status(500).json({
    message: "Unable to fetch answers."
  })
}
return res.status(200).json({
  data: results.rows[0]
})
})

// User can create answer for a question
questionRouter.post('/:questionId/answers', [validateCreateAnswerData], async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  const newAnswers = {
    ...req.body,
  }
    try {
      await connectionPool.query(
        `insert into answers (question_id, content) 
        values ($1, $2)
        `,
        [
          questionIdFromClient,
          newAnswers.content,
        ]
      )
      return res.status(201).json({
        message: "Answer created successfully."
      })
    } catch (error) {
      return res.status(500).json({
        message: "Unable to create answers.",
        error: error.message
      })
    }
})

// User can delete answers for a question
questionRouter.delete('/:questionId/answers', async (req, res) => {
  const questionIdFromClient = req.params.questionId;

  try {
  await connectionPool.query(
    `delete from answers
    where question_id = $1
    `, [questionIdFromClient]
  )
  return res.status(200).json({
    message: "All answers for the question have been deleted successfully."
  })
} catch {
  return res.status(500).json({
    message:  "Unable to delete answers."
    })
  }
})

// User can vote on a question
questionRouter.post('/:questionId/vote', [validateVote], async (req, res) => {
  const questionIdFromClient = req.params.questionId;

  const newVote = req.body.vote;
  try {
    await connectionPool.query(
      `insert into question_votes (question_id, vote)
      values ($1, $2)`, [questionIdFromClient, newVote]
    )
    return res.status(200).json({
      message: "Vote on the question has been recorded successfully."
    })
  } catch (error) {
    return res.status(500).json({
      message: "Unable to vote question.",
      error: error.message
    })
  }
})


export default questionRouter;
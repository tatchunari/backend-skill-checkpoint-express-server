import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answerRouter = Router();


// User can vote on an answer
answerRouter.post('/:answerId/vote', async (req, res) => {
  const answerIdFromClient = req.params.answerId;

  const newVote = req.body.vote;
  try {
    await connectionPool.query(
      `insert into answer_votes (answer_id, vote)
      values ($1, $2)`, [answerIdFromClient, newVote]
    )
    return res.status(200).json({
      message: "Vote on the answer has been recorded successfully."
    })
  } catch (error) {
    return res.status(500).json({
      message: "Unable to vote answer.",
      error: error.message
    })
  }
})

export default answerRouter;
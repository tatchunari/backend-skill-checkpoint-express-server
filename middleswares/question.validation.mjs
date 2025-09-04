export const validateCreateQuestionData = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Invalid request data."
    })
  }

  if (!req.body.description) {
    return res.status(400).json({
      message: "Invalid request data."
    })
  }

  if (!req.body.category) {
    return res.status(400).json({
      message: "Invalid request data."
    })
  }

  next();
}
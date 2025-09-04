export const validateCreateAnswerData = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({
      message: "Invalid request data."
    })
  }

  // Content must be no longer than 300 characters
  if (req.body.content.length > 300) {
    return res.status(400).json({
      message: "Content length must not be longer than 300 characters."
    })
  }
  next();
}
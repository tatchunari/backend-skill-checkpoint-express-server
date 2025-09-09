export const validateCreateQuestionData = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Invalid request, please enter title."
    })
  }

  if (!req.body.description) {
    return res.status(400).json({
      message: "Invalid request, please enter description."
    })
  }

  if (!req.body.category) {
    return res.status(400).json({
      message: "Invalid request, please enter category."
    })
  }

  next();
}

export const validateUpdateQuestionData = (req, res, next) => {
  const { title, description, category } = req.body;

  if (category !== undefined) {
    return res.status(400).json({
      message: "Category cannot be updated."
    })
  }

  if (!title && !description) {
    return res.status(400).json({
      message: "At least one field (title, description) is required."
    })
  }
  next();
}
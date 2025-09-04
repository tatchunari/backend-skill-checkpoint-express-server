export const validateVote = (req, res, next) => {
  if (!req.body.vote) {
    return res.status(400).json({
      message: "Invalid Vote value"
    })
  }

  if (req.body.vote !== "1" && req.body.vote !== "-1") {
    return res.status(400).json({ message: "Invalid Vote value" });
  }
  next();
}
const { Router } = require("express");
const router = Router();

const queries = require("../db/queries");

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid Id"));
}

router.get("/", async (req, res) => {
  const carreras = await queries.getAll();
  res.json(carreras);
});

router.get("/:id", isValidId, (req, res) => {
  res.json({
    message: "😁",
  });
});

module.exports = router;

const express = require("express");

const { createQuestion, getQuestion, deleteQuestion, updateQuestion } = require("../controllers/questionControllers");
const router = express.Router();

router.get("/", getQuestion);
router.post("/create", createQuestion);
router.delete("/delete/:id", deleteQuestion);
router.patch("/update/:id", updateQuestion);

module.exports = router;
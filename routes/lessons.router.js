const express = require("express");
const router = express.Router();
const LessonsController = require('../controller/lessons.controller')
const validMiddleware = require('../middleware/lessons.validation')

router
    .post("/", validMiddleware, LessonsController.createLessons)
    .get("/", LessonsController.getLessons)
    .get("/:id", LessonsController.getOneLesson)
    .delete("/:id", LessonsController.deleteLesson)
router
    .patch("/status/:id", LessonsController.lessonFinished)

module.exports = router;

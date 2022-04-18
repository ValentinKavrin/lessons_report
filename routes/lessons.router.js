const express = require("express");
const router = express.Router();
const LessonsController = require('../controller/lessons.controller')
const validMiddleware = require('../middleware/valid.middleware')

router
    .post("/", validMiddleware, LessonsController.createLessons)
    .get("/", LessonsController.getLessons)
    .delete("/:id", LessonsController.deleteLesson)
router
    .patch("/status/:id", LessonsController.lessonFinished)
    .post("/addStudent", LessonsController.addStudent)

module.exports = router;

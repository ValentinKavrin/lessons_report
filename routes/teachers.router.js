const express = require("express");
const router = express.Router();

const teachersValidation = require('../middleware/teacher.validation')
const teacherController = require('../controller/teachers.controller')

router
    .post('/', teachersValidation, teacherController.createTeacher)
    .get('/',teacherController.getTeachers)
    .put('/:id', teachersValidation, teacherController.updateTeacher)
    .delete('/:id',teacherController.deleteTeacher)

module.exports = router
const express = require("express");
const router = express.Router();

const studentValidation = require('../middleware/student.validation')
const StudentController = require('../controller/students.controller')

router
    .post('/', studentValidation, StudentController.createStudent)
    .get('/',StudentController.getStudents)
    .put('/:id', studentValidation, StudentController.updateStudent)
    .delete('/:id',StudentController.deleteStudent)

module.exports = router
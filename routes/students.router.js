const express = require("express");
const router = express.Router();

const StudentController = require('../controller/students.controller')

router
    .post('/', StudentController.createStudent)
    .get('/',StudentController.getStudents)
    .put('/:id', StudentController.updateStudent)
    .delete('/:id',StudentController.deleteStudent)

module.exports = router
const studentServices = require('../services/students.services')

class StudentsController {
    async createStudent(req,res) {
        try {
            if (!req.body.name || !req.body.class) {
                return res.status(400).send({ message: "Content can not be empty!" });
            }
            const newStudent = await studentServices.createStudent(req.body)
            res.status(201).json(newStudent)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async getStudents(req,res) {
        try {
            const getStudent = await studentServices.getStudent()
            res.status(200).json(getStudent)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async updateStudent(req,res) {
        try {
            if (!req.body.name && !req.body.password) {
                return res.status(400).send({ message: "Content can not be empty!" });
            }
            const updateStudent = await studentServices.updateStudent(req.body, req.params.id)
            res.status(200).json(updateStudent)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async deleteStudent(req,res) {
        try {
            const deleteStudent = await studentServices.deleteStudent(req.body.id)
            if (deleteStudent) {
                res.status(200).json({message: 'Удаление прошло успешно'})
            } else {
                res.status(400).json({message: 'Пользователь уже удален или не найден'})
            }
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }
}

module.exports = new StudentsController()
const teachersServices = require('../services/teachers.services')

class TeachersController {
    async createTeacher(req,res) {
        try {
            if (!req.body.name || !req.body.discipline) {
                res.status(400).json( {message: 'Content can not be empty'})
            }
            const teacher = {
                name: req.body.name,
                discipline: req.body.discipline
            }
            const newTeacher = await teachersServices.createTeacher(teacher)
            res.status(201).json(newTeacher)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async getTeachers(req,res) {
        try {
            const getTeachers = await teachersServices.getTeachers()
            res.status(200).json(getTeachers)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async updateTeacher(req,res) {
        try {
            if (!req.body.name) {
                res.status(400).json({message: 'Content can not be empty'})
            }
            const updateTeacher = await teachersServices.updateTeacher(req.body.name, req.params.id)

            if (!updateTeacher) {
                res.status(400).json({message: 'Пользователя с таким id не существует'})
            } else {
                res.status(200).json({message: 'Данные пользователя успешно обновлены'})
            }

        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async deleteTeacher(req,res) {
        try {
            const deleteTeacher = await teachersServices.deleteTeacher(req.params.id)
            if (deleteTeacher) {
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

module.exports = new TeachersController()
const lessonsServices = require('../services/lessons.services')

class LessonsController {

    async createLessons(req, res){
        try {
            const result = await lessonsServices.createLessons(req.body)
            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
            if (error.message === 'Нет свободных учителей!') {
                return res.status(400).send({
                    message: "Something went wrong, try again.",
                    error: error.message,
                });
            }
            return res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async getLessons(req, res){
        try {
            const result = await lessonsServices.getLessons(req.query)
            const lessonsList = result.map( (elem) => {
                return {
                    id: elem.id,
                    title: elem.title,
                    class: elem.class,
                    studentsCount: Number(elem.dataValues.studentsCount),
                    date: elem.date,
                    teachers: {
                        id: elem.teachers[0].id,
                        name: elem.teachers[0].name
                    }
                }
            })
            res.status(200).json(lessonsList)
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async addStudent(req, res) {
        try {
            const addStudents = await lessonsServices.addStudent(req.body)
            res.status(200).json(addStudents)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async deleteLesson(req,res) {
        try {
            const deleteLesson = await lessonsServices.deleteLesson(req.params.id)
            if (deleteLesson) return res.status(200).json({message: 'Занятие успешно удалено!'})
            else return res.status(400).json({message: 'Занятие не удалено, попробуйте еще раз!'})
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async lessonFinished(req, res) {
        try {
            const status = await lessonsServices.lessonFinished(req.params.id)
            res.status(200).json(status)
        }
        catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }
}

module.exports = new LessonsController()
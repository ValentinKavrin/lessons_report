const lessonsServices = require('../services/lessons.services')

class LessonsController {

    async createLessons(req, res){
        try {
            const re = new RegExp('^[a-zA-Z0-9 ]+$');
            if (!re.test(req.body.title)) {
                return res.status(400).json('Название должно содержать только латинские буквы и цифры')
            }
            const result = await lessonsServices.createLessons(req.body)
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async getLessons(req, res){
        try {
            const lessons = await lessonsServices.getLessons(req.query)
            res.status(200).json(lessons)
        } catch (error) {
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
            const status = await lessonsServices.lessonFinished(req.body)
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
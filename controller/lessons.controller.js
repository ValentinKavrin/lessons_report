const lessonsServices = require('../services/lessons.services')

class LessonsController {
    async getLessons(req, res){
        try {
            const page = req.query.page
            let limit = 5
            if (req.query.lessonsPerPage) {
                limit = req.query.lessonsPerPage
            }
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            
            const lessons = await lessonsServices.getLessons(req.query)
            const lessonsArr = lessons.map(elem => { return {
                    id: elem.id,
                    date: elem.date,
                    title: elem.title,
                    status: elem.status,
                    students: elem.students,
                    teachers: elem.teachers
                }
            })
            const result = lessonsArr.slice(startIndex, endIndex)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }

    async createLessons(req, res){
        try {
            const result = await lessonsServices.createLessons(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).send({
                message: "Something went wrong, try again.",
                error: error.message,
            });
        }
    }
}

module.exports = new LessonsController()
const db = require('../models')
const Op = db.Sequelize.Op;
const sequelize = require('../models').sequelize
const initModels = require('../models/init-models').initModels
const models = initModels(sequelize)

const Lessons = models.lessons
const Students = models.students
const Teachers = models.teachers
const Lesson_students = models.lesson_students
const Lesson_teachers = models.lesson_teachers

class LessonsRepository {

    async createLessons(params, newDate){
        try {
            const createLessons = await Lessons.create({
                title: params.title,
                date: newDate
            })
            params.teacherIds.forEach( async (element) => {
                const teachers = await Teachers.findByPk(element)
                await createLessons.addTeachers(teachers, {through: Lesson_teachers})
            })
            return createLessons
        }
        catch (error) {
            throw (error)
        }
    }

    async getLessons(options){
        try {
            const getLessons = await Lessons.findAll(options)
            return getLessons
        }
        catch (error) {
            throw (error)
        }
    }

    async deleteLessons(id){
        try {
            const deleteLesson = await Lessons.destroy({
                where: {
                    id: id
                }
            })
            if (deleteLesson === 1) return true
            else return false
        }
        catch (error) {
            throw (error)
        }
    }

    async lessonsFinished(id){
        try {
            const updateStatus = await Lessons.update(
                {status: 1},
                {
                    where: {
                        id: id
                    }
                }
            )
            return updateStatus
        }
        catch (error) {
            throw (error)
        }
    }


}

module.exports = new LessonsRepository()
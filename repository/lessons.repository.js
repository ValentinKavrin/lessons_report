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

    async createLessons(params, newDate, teacher_id){
        try {
            const createLessons = await Lessons.create({
                title: params.title,
                date: newDate,
                class: params.class
            })
            await createLessons.addTeachers(teacher_id, {through: Lesson_teachers})
            return createLessons
        }
        catch (error) {
            throw (error)
        }
    }
  /*  [sequelize.literal(`(
                                    select * from lessons
                                    left outer join students
                                    on students.class = lessons.class
                                    )`), 'students']*/

    async getLessons(options){
        try {
            return await Lessons.findAll(options)
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
            if (deleteLesson === 1) {
                return true
            } else {
                return false
            }

        }
        catch (error) {
            throw (error)
        }
    }

    async lessonsFinished(id){
        try {
            return await Lessons.update(
                {status: 1},
                {
                    where: {
                        id: id
                    }
                }
            )
        }
        catch (error) {
            throw (error)
        }
    }

    async addStudent(lesson_id, students_id) {
        try {
            const lesson = await Lessons.findByPk(lesson_id)
            for (const element of students_id) {
                const student = await Students.findByPk(element)
                await lesson.addStudents(student, {through: Lesson_students})
            }
            return lesson
        }
        catch (error) {
            throw (error)
        }
    }

    async checkCountTeacher(id) {
        try {
            return await Lesson_teachers.count({where: {teacher_id: id}})
        }
        catch (error) {
            throw (error)
        }
    }
}

module.exports = new LessonsRepository()
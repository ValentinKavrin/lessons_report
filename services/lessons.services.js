const db = require('../models')
const Op = db.Sequelize.Op;
const sequelize = require('../models').sequelize
const initModels = require('../models/init-models').initModels
const models = initModels(sequelize)

const lessonsRepository = require('../repository/lessons.repository')
const teachersRepository = require('../repository/teachers.repository')
const studentsRepository = require('../repository/students.repository')

const Lessons = models.lessons
const Students = models.students
const Teachers = models.teachers
const Lesson_students = models.lesson_students
const Lesson_teachers = models.lesson_teachers

class LessonsServices{

    async createLessons(params) {
        try {
            let dayIndex = this.checkDay(params).dayIndex
            let firstDate = this.checkDay(params).firstDate
            let startDay = this.checkDay(params).startDay
            let id = []
            const teacher_id = await this.checkTeacher({discipline: params.title})
            if (params.hasOwnProperty('lessonsCount')) {
                for (let i = 0; i < params.lessonsCount; i++) {
                    let newDate = new Date(firstDate)
                    if (dayIndex === params.days.length) {
                        params.days.forEach((element, index) => {
                            params.days[index] = element + 7
                        })
                        dayIndex = 0
                    }
                    const date = params.days[dayIndex] - startDay
                    dayIndex++
                    newDate.setDate(newDate.getDate() + date)
                    const lessons = await lessonsRepository.createLessons(params, newDate, teacher_id)
                    id.push(lessons.dataValues.id)
                }
            } else {
                let newDate = new Date
                const lastDate = new Date(params.lastDate)
                while (newDate.getTime() < lastDate.getTime()){
                    newDate = new Date(firstDate)
                    if (dayIndex === params.days.length) {
                        params.days.forEach((element, index) => {
                            params.days[index] = element + 7
                        })
                        dayIndex = 0
                    }
                    const date = params.days[dayIndex] - startDay
                    dayIndex++
                    newDate.setDate(newDate.getDate() + date)
                    if (newDate.getTime() > lastDate.getTime()) {
                        break
                    }
                    const lessons = await lessonsRepository.createLessons(params, newDate)
                    id.push(lessons.dataValues.id)
                }
            }
            return id
        } catch (error) {
            throw (error)
        }
    }
    async getLessons(filter) {
        try {
            let limit = 5
            if (filter.hasOwnProperty('lessonsPerPage')) limit = filter.lessonsPerPage
            const studentsCount = [sequelize.literal(
                    `(select count(*) from students 
                    where students.class = lessons.class)`
                ),'studentsCount']
            const options = {
                attributes: {
                    include: [
                        studentsCount
                    ]
                },
                where: {},
                include: [
                    {
                        model: Teachers,
                        where: {}
                    }
                ],
                order:[
                    ['date', 'ASC'],
                    ['id', 'ASC']
                ],
                offset: (filter.page - 1) * limit,
                limit: limit
            }
            if (Object.keys(filter).length !== 0) {
                options.where = []
                if (filter.hasOwnProperty('status')) {
                    options.where.push({status: Number(filter.status)})
                }
                if (filter.hasOwnProperty('date')) {
                    if (filter.date.includes(',')) {
                        const date = filter.date.split(',')
                        const startDate = new Date(date[0])
                        const stopDate = new Date(date[1])
                        const index = options.where.push({date: {}}) - 1
                        options.where[index].date = {[Op.between]: [startDate, stopDate]}
                    } else {
                        const date = new Date(filter.date)
                        options.where.push({date: date})
                    }
                }
                // if (filter.hasOwnProperty('teacherIds')) {
                //     if (filter.teacherIds.includes(',')) {
                //         options.include[0].where[Op.or] = []
                //         const teachers_id = filter.teacherIds.split(',')
                //         teachers_id.forEach((elem) => {
                //             options.include[0].where[Op.or].push({id: Number(elem)})
                //         })
                //     } else {
                //         options.include[0].where = {id: Number(filter.teacherIds)}
                //     }
                // }
                if (filter.hasOwnProperty('class')) {
                    if (filter.class.includes(',')) {
                        const index = options.where.push({class: {}}) - 1
                        options.where[index].class[Op.or] = []
                        const numberOfClass = filter.class.split(',')
                        numberOfClass.forEach((elem) => {
                            options.where[index].class[Op.or].push( Number(elem))
                        })
                    } else {
                        options.where.push({class: Number(filter.class)})
                    }
                }
                if (filter.hasOwnProperty('discipline')) {
                    options.where.push({title: filter.discipline})
                }
            }
            return await lessonsRepository.getLessons(options)
        } catch (error) {
            throw (error)
        }
    }

    async getOneLesson(id) {
        const lessonData = await lessonsRepository.getOneLesson(id)
        if (!lessonData) {
            throw new Error('Данное занятие не найдено')
        }
        const lesson = {
            id: lessonData.id,
            title: lessonData.title,
            date: lessonData.date,
            class: lessonData.class,
            status: lessonData.status,
            students: []
        }
        const students = await studentsRepository.getStudentsThisClass(lesson.class)
        if (students.length !== 0) {
            students.forEach((student) => {
                lesson.students.push({
                    id: student.id,
                    name: student.name
                })
            })
        }
        return lesson
    }

    async deleteLesson(id) {
        try {
            return await lessonsRepository.deleteLessons(id)
        }
        catch (error) {
            throw (error)
        }
    }

    async lessonFinished(id) {
        try {
            return await lessonsRepository.lessonsFinished(id)
        }
        catch (error) {
            throw (error)
        }
    }

    checkDay(params) {
        let dayIndex = 0
        let firstDate = new Date(params.firstDate)
        let startDay = params.days.find(elem => elem >= firstDate.getDay())
        if (startDay !== undefined) {
            if (startDay !== firstDate.getDay()) {
                firstDate.setDate(firstDate.getDate() + (startDay - firstDate.getDay()))
            }
            dayIndex = params.days.indexOf(startDay)
        } else {
            startDay = new Date(params.firstDate).getDay()
            params.days.forEach((element, index) => {
                params.days[index] = element + 7
            })
        }
        return {
            startDay,
            dayIndex,
            firstDate,
        }
    }

    async checkTeacher(discipline) {
        try {
            const teachers = await teachersRepository.getTeachers(discipline)
            for (let i = 0; i < teachers.length; i++) {
                const count = await lessonsRepository.checkCountTeacher(teachers[i].id)
                if (count < 30) {
                    return teachers[i].id
                }
            }
            throw new HttpError('Нет свободных учителей!', 400)
        }
        catch (e) {
            throw e
        }
    }
}

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}

module.exports = new LessonsServices()
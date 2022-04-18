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
const lessonsRepository = require('../repository/lessons.repository')

class LessonsServices{

    async createLessons(params) {
        try {
            let dayIndex = checkDay(params).dayIndex
            let firstDate = checkDay(params).firstDate
            let startDay = checkDay(params).startDay
            let id = []
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
                    const lessons = await lessonsRepository.createLessons(params, newDate)
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
            const options = {
                where: {},
                include: [
                    {
                        model: Teachers,
                        where: {}
                    },
                    {
                        model: Students,
                    }
                ],
                order:[
                    ["id", "ASC"]
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
                        options.where = {date: {}}
                        options.where.date = {[Op.between]: [startDate, stopDate]}
                    } else {
                        const date = new Date(filter.date)
                        options.where.push({date: date})
                    }
                }
                if (filter.hasOwnProperty('teacherIds')) {
                    options.include[0].where[Op.or] = []
                    if (filter.teacherIds.includes(',')) {
                        const teachers_id = filter.teacherIds.split(',')
                        teachers_id.forEach((elem) => {
                            options.include[0].where[Op.or].push({id: Number(elem)})
                        })
                    } else {
                        options.include[0].where[Op.or].push({id: Number(filter.teacherIds)})
                    }
                }
            }
            const getLessons = await lessonsRepository.getLessons(options)
            return getLessons
        } catch (error) {
            throw (error)
        }
    }

    async addStudent(filter) {
        try {

        }
        catch (error) {
            throw (error)
        }
    }

    async deleteLesson(id) {
        try {
            const deleteLesson = await lessonsRepository.deleteLessons(id)
            return deleteLesson
        }
        catch (error) {
            throw (error)
        }
    }

    async lessonFinished(id) {
        try {
            const status = await lessonsRepository.lessonsFinished(id)
            return status
        }
        catch (error) {
            throw (error)
        }
    }
}

function checkDay(params) {
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

module.exports = new LessonsServices()
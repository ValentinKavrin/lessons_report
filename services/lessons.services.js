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

class LessonsServices{

    async getLessons(filter) {
        try {
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
                ]
            }
            console.log(filter);
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
                if (filter.hasOwnProperty('teachers_id')) {
                    options.include[0].where[Op.or] = []
                    options.include[0].where[Op.or].push({id: Number(filter.teachers_id)})
                }
            }
            const getLessons = await Lessons.findAll(options)
            return getLessons
        } catch (error) {
            throw (error)
        }
    }

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
                    const lessons = await addLessons(params, newDate)
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
                    const lessons = await addLessons(params, newDate)
                    id.push(lessons.dataValues.id)
                } 
            }
            return id
        } catch (error) {
            throw (error)
        }
    }
}

async function addLessons(params, newDate) {
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
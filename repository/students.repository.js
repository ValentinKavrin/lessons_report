const sequelize = require('../models').sequelize
const initModels = require('../models/init-models').initModels
const models = initModels(sequelize)

const Students = models.students

class StudentsRepository {
    async createStudent(student) {
        try {
            return await Students.create({
                name: student.name,
                class: student.class,
                username: student.userName,
                password: student.password
            })
        }
        catch (error) {
            throw (error)
        }
    }

    async getStudents() {
        try {
            return await Students.findAll()
        }
        catch (error) {
            throw (error)
        }
    }

    async updateName(student,options) {
        try {
            return await Students.update(student, options)
        }
        catch (error) {
            throw (error)
        }
    }

    /*async updateClass() {
        try {
            return await Students.update({
                class: +1
            })
        }
        catch (error) {
            throw (error)
        }
    }*/

    async deleteStudents(id) {
        try {
            return await Students.destroy({
                where: {
                    id: id
                }
            })
        }
        catch (error) {
            throw (error)
        }
    }
}

module.exports = new StudentsRepository()
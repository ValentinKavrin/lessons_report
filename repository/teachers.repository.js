const sequelize = require('../models').sequelize
const initModels = require('../models/init-models').initModels
const models = initModels(sequelize)

const Teachers = models.teachers

class TeachersRepository {
    async createTeacher(teacher) {
        try {
            return await Teachers.create({
                name: teacher.name,
                discipline: teacher.discipline,
                username: teacher.userName,
                password: teacher.password
            })
        }
        catch (error) {
            throw error
        }
    }

    async getTeachers() {
        try {
            return await Teachers.findAll()
        }
        catch (error) {
            throw error
        }
    }

    async updateTeacher(name, id) {
        try {
            return await Teachers.update({
                name: name
            }, {
                where: {
                    id: id
                }
            })
        }
        catch (error) {
            throw error
        }
    }

    async deleteTeacher(id) {
        try {
            return await Teachers.destroy({
                where: {
                    id: id
                }
            })
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new TeachersRepository()
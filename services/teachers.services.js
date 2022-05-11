const teachersRepository = require('../repository/teachers.repository')
const bcrypt = require("bcrypt");

class TeachersServices {
    async createTeacher(teacher) {
        try {
            teacher.userName = teacher.name.split(' ')[0] + Date.now()
            teacher.password = bcrypt.hashSync(this.randomString(8), 6)
            return await teachersRepository.createTeacher(teacher)
        }
        catch (error) {
            throw error
        }
    }

    async getTeachers() {
        try {
            return await teachersRepository.getTeachers()
        }
        catch (error) {
            throw error
        }
    }

    async updateTeacher(name, id) {
        try {
            const updateTeacher = await teachersRepository.updateTeacher(name, id)
            return updateTeacher !== 0
        }
        catch (error) {
            throw error
        }
    }

    async deleteTeacher(id) {
        try {
            const deleteTeacher = await teachersRepository.deleteTeacher(id)
            return deleteTeacher !== 0
        }
        catch (error) {
            throw error
        }
    }

    randomString(i) {
        let rnd = '';
        while (rnd.length < i)
            rnd += Math.random().toString(36).substring(2);
        return rnd.substring(0, i);
    }
}

module.exports = new TeachersServices()
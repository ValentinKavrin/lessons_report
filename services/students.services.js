const bcrypt = require('bcrypt');

const studentRepo = require('../repository/students.repository')

class StudentsServices {
    async createStudent(params) {
        try {
            const userName = params.name + Date.now()
            const password = this.randomString(8)
            const hashPassword = bcrypt.hashSync(password, 6);

            const student = {
                name: params.name,
                class: params.class,
                userName: userName,
                password: hashPassword
            }
            return await studentRepo.createStudent(student)
        }
        catch (error) {
            throw (error)
        }
    }

    async getStudent() {
        try {
            return await studentRepo.getStudents()
        }
        catch (error) {
            throw (error)
        }
    }

    async updateStudent(params,id) {
        try {
            const options = {
                where: {id: id}
            }
            let hashPassword
            if (params.hasOwnProperty('password')) {
                hashPassword = bcrypt.hashSync(params.password, 6);
            }
            const student = {
                name: params.name,
                password: hashPassword
            }
            return await studentRepo.updateStudent(student, options)
        }
        catch (error) {
            throw (error)
        }
    }

    async deleteStudent(id) {
        try {
            const deleteStudent = await studentRepo.deleteStudents(id)
            if (deleteStudent === 0) {
                return false
            } else {
                return true
            }
        }
        catch (error) {
            throw (error)
        }
    }

    async updateAllClass() {
        try {
            return await studentRepo.updateAllClass()
        }
        catch (error) {
            throw (error)
        }
    }

    randomString(i) {
        let rnd = '';
        while (rnd.length < i)
            rnd += Math.random().toString(36).substring(2);
        return rnd.substring(0, i);
    }
}



module.exports = new StudentsServices()
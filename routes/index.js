const Router = require('express')
const router = new Router()

router.use('/lessons', require('./lessons.router'))
router.use('/students', require('./students.router'))

module.exports = router

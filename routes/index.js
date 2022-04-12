const Router = require('express')
const LessonsController = require('../controller/lessons.controller')

const router = new Router()

router.get('/', LessonsController.getLessons)
router.post('/lessons', LessonsController.createLessons)

module.exports = router

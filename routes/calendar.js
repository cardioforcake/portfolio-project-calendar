const router = require('express').Router()
const calendarCtrl = require('../controllers/calendar')

router.get('/', calendarCtrl.index)

module.exports = router
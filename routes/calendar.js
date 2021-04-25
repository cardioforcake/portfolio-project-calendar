const router = require('express').Router()
const calendarCtrl = require('../controllers/calendar')

router.get('/', calendarCtrl.index)
router.get('/show/:id', calendarCtrl.show)
router.post('/show/:id', calendarCtrl.show)
router.post('/:id/add', calendarCtrl.add)
router.delete('/:id/:task/delete', calendarCtrl.del)
router.put('/:id/:task/update', calendarCtrl.update)

module.exports = router
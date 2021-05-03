const router = require('express').Router()
const calendarCtrl = require('../controllers/calendar')

router.get('/', calendarCtrl.index)
router.post('/:id/add', calendarCtrl.add)
router.delete('/:id/:task/delete', calendarCtrl.del)
router.put('/:id/:task/update', calendarCtrl.update)
router.delete('/:id/:task/move', calendarCtrl.move)

module.exports = router
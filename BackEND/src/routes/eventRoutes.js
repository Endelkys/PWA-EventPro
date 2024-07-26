const router = require('express').Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { createEvent, updateEvent, getAllEvents, getEventsByPromotorIdStatus, getEventsStatus, getEventsWithSalesInfo, deleteEvent } = require('../controllers/eventController');

router.post('/', verifyToken, createEvent);
router.get('/', verifyToken, getAllEvents);
router.get('/sold', verifyToken, getEventsWithSalesInfo);
router.get('/status/:filter', verifyToken, getEventsStatus);
router.get('/:id', verifyToken, getEventsByPromotorIdStatus);
router.put('/:id', verifyToken, updateEvent);
router.delete('/delete/:id', verifyToken, deleteEvent);

module.exports = router;
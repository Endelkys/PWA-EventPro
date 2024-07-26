const router = require('express').Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { getPaymentRecords, getPaymentRecordsUser, createPaymentRecord, deletePayment, approvePayment } = require('../controllers/paymentRecord');

router.get('/', verifyToken, getPaymentRecords);
router.get('/users', verifyToken, getPaymentRecordsUser);
router.post('/', verifyToken, createPaymentRecord);
router.patch('/:id', verifyToken, approvePayment);
router.delete('/:id', verifyToken, deletePayment);

module.exports = router;
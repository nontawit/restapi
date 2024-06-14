const express = require('express');
const {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllOrders,
    getOrdersByStatus,
    getTotalOrders,
    getPendingOrders,
    getCompletedOrders
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrder);
router.get('/', getAllOrders);
router.get('/status/:status', getOrdersByStatus);
router.get('/dashboard/total-orders', getTotalOrders);
router.get('/dashboard/pending-orders', getPendingOrders);
router.get('/dashboard/completed-orders', getCompletedOrders);

module.exports = router;

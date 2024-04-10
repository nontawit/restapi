const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

//Get all orders
router.get('/', async (req, res) => {
    try {
        const order = await Order.find();
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//Create a new order
router.post('/', async (req, res) => {
    const order = new Order({
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        orderQuantity: req.body.orderQuantity,
        deliveryDate: req.body.deliveryDate
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

//Get order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

//Update order
router.patch('/:id', getOrder, async (req, res) => {
    if (req.body.customerName != null) {
        res.body.customerName = req.body.customerName;
    }
    if (req.body.customerAddress != null) {
        res.body.customerAddress = req.body.customerAddress;
    }
    if (req.body.customerPhone != null) {
        res.body.customerPhone = req.body.customerPhone;
    }
    if (req.body.orderQuantity != null) {
        res.body.orderQuantity = req.body.orderQuantity;
    }
    if (req.body.deliveryDate != null) {
        res.body.deliveryDate = req.body.deliveryDate;
    }
    if (req.body.orderStatus != null) {
        res.body.orderStatus = req.body.orderStatus;
    }
    try {
        const updateOrder = await res.order.save();
        res.json(updateOrder);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
})

//Delete order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Delete order' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

module.exports = router;
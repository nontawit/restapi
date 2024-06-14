const Order = require('../models/order');
const { convertToGregorianYear, formatDate, formatThaiDate } = require('../utils/dateUtils');

// Create order
const createOrder = async (req, res) => {
    try {
        const { name, address, phone, amount, date, status } = req.body;
        const gregorianDate = convertToGregorianYear(date);
        const formattedDate = formatDate(gregorianDate);
        const newOrder = new Order({ name, address, phone, amount, date: formattedDate, status });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(204).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, amount, date, status } = req.body;
        const gregorianDate = convertToGregorianYear(date);
        const formattedDate = formatDate(gregorianDate);
        const updatedOrder = await Order.findByIdAndUpdate(id, { name, address, phone, amount, date: formattedDate, status }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            date: formatThaiDate(order.date)
        }));
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders by status
const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const query = status === 'รอดำเนินการ' ? { status: { $in: ['รอดำเนินการ', 'รอชำระเงิน'] } } : { status };
        const orders = await Order.find(query);
        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            date: formatThaiDate(order.date)
        }));
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dashboard endpoints
const getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalAmount = await Order.aggregate([
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        res.status(200).json({ totalOrders, totalAmount: totalAmount[0]?.totalAmount || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPendingOrders = async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: { $in: ['รอดำเนินการ', 'รอชำระเงิน'] } });
        const pendingAmount = pendingOrders.reduce((sum, order) => sum + order.amount, 0);
        res.status(200).json({ pendingOrdersCount: pendingOrders.length, pendingAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompletedOrders = async (req, res) => {
    try {
        const completedOrders = await Order.find({ status: 'เสร็จสิ้น' });
        const completedAmount = completedOrders.reduce((sum, order) => sum + order.amount, 0);
        res.status(200).json({ completedOrdersCount: completedOrders.length, completedAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    deleteOrder,
    updateOrder,
    getAllOrders,
    getOrdersByStatus,
    getTotalOrders,
    getPendingOrders,
    getCompletedOrders
};

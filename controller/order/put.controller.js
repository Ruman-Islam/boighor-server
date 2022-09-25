const putServices = require('../../services/order/put.services');

// POST A ORDER
module.exports.putAnOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const result = await putServices.putAnOrder(order);
        if (!result) {
            return res.status(500).json({
                "result": "Something went wrong."
            })
        }
        if (result.name === 'ValidationError') {
            return next(result);
        };
        return res.status(200).json({
            "result": "Order has been confirmed"
        })
    } catch (err) {
        return next(err);
    }
};


// CANCEL ORDER
module.exports.cancelOrder = async (req, res, next) => {
    try {
        const { order_id, email } = req.query;
        const result = await putServices.cancelOrder(order_id, email)
        if (!result) {
            return res.status(500).json({
                "result": "Something went wrong"
            })
        }
        return res.status(200).json({
            "result": "Order canceled"
        })
    } catch (error) {
        return next(error)
    }
}


// UPDATE TRANSACTION 
module.exports.updateTransaction = async (req, res, next) => {
    try {
        const { trans_id, order_id, email } = req.query;
        const result = await putServices.updateTransaction(trans_id, order_id, email);
        if (!result) {
            return res.status(500).json({
                "result": "Something went wrong"
            })
        }
        return res.status(200).json({
            "result": "Payment updated"
        })
    } catch (error) {
        return next(error)
    }
};
const cartServices = require('../../services/cart/put.services');


exports.saveToCart = async (req, res, next) => {
    try {
        const order = req.body;
        const result = await cartServices.saveToCart(order);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        if (result.name === 'ValidationError') {
            return next(result)
        };
        return res.status(200).json({
            "message": "Order was updated successfully!",
        });
    } catch (error) {
        next(error)
    }
};

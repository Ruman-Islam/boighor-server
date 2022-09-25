const Order = require('../../models/Order');

exports.getAllOrdersOfAUser = async (user_email) => {
    try {
        const result = await Order.find({ email: user_email });

        if (result.length === 0) {
            return false;
        }
        return result[0].orders;
    } catch (error) {
        return error;
    }
};


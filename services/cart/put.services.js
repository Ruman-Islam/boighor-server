const Cart = require('../../models/Cart');

exports.saveToCart = async (order) => {
    const email = order?.email;
    try {
        const user = await Cart.findOne({ email: email });
        if (!user) {
            const newOrder = new Cart(order);
            const savedOrder = await newOrder.save();
            return true;
        } else {
            await Cart.updateMany({ email: email }, { $push: { products: { $each: order?.products } } });
            return true;
        }
    } catch (error) {
        return error;
    }
};

const Order = require('../../models/Order');


// POST A ORDER
exports.putAnOrder = async (new_order) => {
    try {
        const { user_name, email, phone, order } = new_order;
        const result = await Order.updateOne(
            { email: email },
            {
                $set: {
                    user_name: user_name,
                    email: email,
                    phone: phone,
                },
                $push: { orders: order }
            },
            { upsert: true }
        )
        if (result.modifiedCount > 0 || result.upsertedCount > 0) {
            return true;
        }
    } catch (err) {
        return err
    }
};

// CANCEL ORDER
exports.cancelOrder = async (order_id, email) => {
    try {
        const user_order = await Order.findOne({ email: email })
        if (user_order) {
            const { orders } = user_order;
            let new_orders = [];
            for (const order of orders) {
                if (order.order_id === +order_id) {
                    order.confirmation_status = "CANCELED"
                    new_orders.push(order)
                } else {
                    new_orders.push(order)
                }
            }
            await Order.updateOne({ email: email }, { $set: { orders: new_orders } })
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
}

// UPDATE TRANSACTION 
exports.updateTransaction = async (trans_id, order_i, email) => {
    try {
        const user_order = await Order.findOne({ email: email })
        if (user_order) {
            const { orders } = user_order;
            let new_orders = [];
            for (const order of orders) {
                if (order.order_id === +order_i) {
                    order.transaction_id = trans_id
                    order.payment_status = "PAID"
                    new_orders.push(order)
                } else {
                    new_orders.push(order)
                }
            }
            await Order.updateOne({ email: email }, { $set: { orders: new_orders } })
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
};
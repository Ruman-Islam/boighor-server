const getServices = require('../../services/order/get.services');

module.exports.getAllOrdersOfAUser = async (req, res, next) => {
    try {
        const { email } = req.query;
        const result = await getServices.getAllOrdersOfAUser(email);
        if (!result) {
            return res.status(404).json({
                "result": "No data found"
            });
        }
        return res.status(200).json({
            "result": result
        });

    } catch (error) {
        return next(error)
    }
};
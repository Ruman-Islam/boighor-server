const userServices = require('../../services/user/get.services');

// GET INDIVIDUAL CUSTOMER/USER ALL DATA
module.exports.getIndividualUserInfo = async (req, res, next) => {
    try {
        const email = req.query.email;
        const result = await userServices.getIndividualUserInfo(email);
        if (!result) {
            return res.status(404).json({
                "result": 'No data found',
            });
        }
        return res.status(200).json({
            "result": result,
        });
    } catch (error) {
        next(err);
    }
};
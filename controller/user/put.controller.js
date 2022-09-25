const userServices = require('../../services/user/put.services');

// LOG IN WITH SOCIAL AND GENERATE TOKEN
module.exports.createUserAndGenerateToken = async (req, res, next) => {
    try {
        const user_email = req.body.email;
        const user_data = req.body;
        const result = await userServices.createUserAndGenerateToken(user_email, user_data);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        if (result.name === 'ValidationError') {
            return next(result)
        };
        res.status(200).json({ "accessToken": result });
    } catch (err) {
        return next(err);
    }
};


// LOG IN WITH SOCIAL AND GENERATE TOKEN
module.exports.registerUserAndGenerateToken = async (req, res, next) => {
    try {
        const user_data = req.body;
        const result = await userServices.registerUserAndGenerateToken(user_data);
        if (result === 'exists') {
            return res.status(409).json({
                "result": 'This email already has registered.',
            });
        }
        if (result.name === 'ValidationError') {
            return next(result)
        }
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        res.status(200).json({ "accessToken": result });
    } catch (err) {
        return next(err);
    }
};
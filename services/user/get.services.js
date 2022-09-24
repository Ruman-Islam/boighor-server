const User = require('../../models/User');


// GET INDIVIDUAL CUSTOMER/USER ALL DATA
exports.getIndividualUserInfo = async (email) => {
    try {
        const result = await User.findOne({ email: email });
        if (!result) {
            return false;
        }
        return result;
    } catch (err) {
        return err;
    }
};
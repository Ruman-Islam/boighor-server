const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { Types: { ObjectId } } = require('mongoose');


// LOG IN WITH SOCIAL AND GENERATE TOKEN
exports.createUserAndGenerateToken = async (email, user) => {
    try {
        const result = await User.findOne({ email: email });
        if (!result) {
            const newUser = new User(user);
            const savedUser = await newUser.save();
            if (!savedUser) {
                return false;
            }
        }
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        return token;
    } catch (err) {
        return err;
    }
};


// LOG IN WITH SOCIAL AND GENERATE TOKEN
exports.registerUserAndGenerateToken = async (user_data) => {
    try {
        const result = await User.findOne({ email: user_data?.email });
        if (result) {
            return 'exists';
        }
        const newUser = new User(user_data);
        const savedUser = await newUser.save();
        if (savedUser) {
            const token = jwt.sign({ email: user_data?.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            return token;
        }
    } catch (err) {
        return err;
    }
};
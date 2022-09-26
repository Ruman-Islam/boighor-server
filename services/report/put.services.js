const Report = require('../../models/Report');

exports.postAReport = async (report) => {

    try {
        const email = report.user_email;
        const name = report.user_name;
        const message = report.message;

        const isExisted = await Report.updateOne(
            { user_email: email },
            { $set: { message: message, user_name: name } },
            { upsert: true }
        )
        if (isExisted.modifiedCount > 0 || isExisted.upsertedCount > 0) {
            return true
        }
    } catch (error) {
        return error;
    }

}
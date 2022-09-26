const putServices = require('../../services/report/put.services');

module.exports.postAReport = async (req, res, next) => {
    try {
        const report = req.body;

        const result = await putServices.postAReport(report);
        if (!result) {
            return res.status(400).json({
                "result": "Something went wrong"
            })
        }
        return res.status(200).json({
            "result": "Report added successfully"
        })
    } catch (error) {
        return next(error)
    }
}
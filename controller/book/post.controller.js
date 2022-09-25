const bookServices = require('../../services/book/post.services');



// ADD A BOOK
module.exports.addABook = async (req, res, next) => {
    try {
        const result = await bookServices.addABook(req.body, next);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Inserted successfully!",
        })
    } catch (err) {
        return next(err);
    }
};

// ADD MANY BOOKS
module.exports.addManyBooks = async (req, res, next) => {
    try {
        const result = await bookServices.addManyBooks(req.body, next, res);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Inserted successfully!",
        })
    } catch (err) {
        return next(err);
    }
};

// GET USER'S CART ITEMS
module.exports.getUserCartItems = async (req, res, next) => {
    try {
        const { ids } = req.body;
        console.log(ids);
        const result = await bookServices.getUserCartItems(ids);
        if (!result) {
            return res.status(404).json({
                "result": 'No data found',
            });
        }
        return res.status(200).json({
            "result": result,
        });
    } catch (error) {
        return next(error)
    }
};
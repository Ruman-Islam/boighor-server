const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const featuredBookSchema = require('../schemas/featuredBookSchema');
const FeaturedBook = new mongoose.model("FeaturedBook", featuredBookSchema);



// GET FEATURED BOOKS
router.get('/get-all', async (req, res, next) => {
    try {
        const result = await FeaturedBook.find({}).populate("identity");
        res.status(200).json({
            result: result.sort((a, b) => b.sellCount - a.sellCount),
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// GET BESTSELLING BOOK
router.get('/bestselling', async (req, res, next) => {
    try {
        const result = await FeaturedBook.find({}).populate("identity");
        res.status(200).json({
            result: result.sort((a, b) => b.sellCount - a.sellCount)[0],
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// UPDATE FEATURED BOOK SELL COUNT
router.put("/update/:id", async (req, res, next) => {
    try {
        const book = await FeaturedBook.findOne({ _id: req.params.id })
        await FeaturedBook.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    sellCount: book ? book.sellCount + 1 : 1,
                    identity: req.params.id
                }
            }, { upsert: true });
        res.status(200).json({
            message: "Success"
        })
    } catch (err) {
        next("There was a server side error!");
    }
});

module.exports = router;
const mongoose = require("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubdate: String,
        language: String,
        numpage: Number,
        author: [Number],
        publications: Number,
        category: [String],
    }
);

//create a book model

const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;
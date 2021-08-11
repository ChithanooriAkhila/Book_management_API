const mongoose = require("mongoose");

//creating a publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//create a publication model

const PublicationModel = mongoose.model("publicationss",PublicationSchema);

module.exports = PublicationModel;
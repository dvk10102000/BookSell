const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Books = new Schema({
    name: String,
    description: String,
    nameAuthor: String,
    yearPublic: String,
    priceOld: Number,
    priceCurrent: Number,
    quantityPage : Number,
    quantity:Number,
    publicLocation: String,
    image: String,
    slug :String,
})

// module.exports = mongoose.model("Book", Books);

module.exports = mongoose.model('Book',Books,'Book');
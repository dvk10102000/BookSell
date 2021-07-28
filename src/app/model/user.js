const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    permission: String,
    address: String,
    phoneNumber: String,
    password: String,
    email: String,
    gender: String,
    birth: String,
    avartar: String,
})

module.exports = mongoose.model('User',user,'User');
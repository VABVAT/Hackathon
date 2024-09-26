const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const users = new Schema({
    full_name: String,
    password : String,
    age: Number,
    sex: String,
    DOB: String,
    adhaarNumber: String,
    address: String,
    city: String,
    state:  String,
    imageUrl: String
})

const userModel =  mongoose.model("users", users);

module.exports = {
    userModel:userModel
}

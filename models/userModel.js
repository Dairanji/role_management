const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const UserModel = new mongoose.model("user", UserSchema);
module.exports = UserModel;
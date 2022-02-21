const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const adminModel = new mongoose.model("admin", AdminSchema);
module.exports = adminModel;
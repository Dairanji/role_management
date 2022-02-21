const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SuperAdminSchema = new Schema({
    superAdminName: {
        type: String,
        required: true
    },
    superAdminEmail: {
        type: String,
        required: true
    },
    superAdminPassword: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const SuperAdminModel = new mongoose.model("superadmin", SuperAdminSchema);
module.exports = SuperAdminModel;
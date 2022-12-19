const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const Account = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("accounts", Account)
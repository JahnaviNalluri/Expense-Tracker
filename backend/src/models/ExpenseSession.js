const mongoose = require("mongoose");

const expenseSessionSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    startedAt: {
        type: Date,
        default: Date.now
    },

    endedAt: {
        type: Date
    },
    

}, { timestamps: true });

module.exports = mongoose.model(
    "ExpenseSession",
    expenseSessionSchema
);
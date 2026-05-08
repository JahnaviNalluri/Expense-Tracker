const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseSession",
    required: true
},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
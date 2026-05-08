const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        icon: {
            type: String,
            default: "",
        },

        color: {
            type: String,
            default: "#000000",
        },

        description: {
            type: String,
            trim: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Category",
    categorySchema
);
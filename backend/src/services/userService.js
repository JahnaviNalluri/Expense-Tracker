const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET =process.env.JWT_SECRET;
const jwt=require("jsonwebtoken");
const bcrypt =require("bcryptjs");




const registerUser = async (userData) => {
    const { name, email, password, phoneno } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneno,
        
    });

    return user;
};



// Get All Users (Pagination)
const getAllUsers = async (page, limit) => {

    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    return {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        users
    };
};



// Get User By Username
const getUserByUsername = async (name) => {

    const user = await User.findOne({ name })
        .select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};



// Update User By ID
const updateUserById = async (id, updateData) => {

    const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};



// Update User By Username
const updateUserByUsername = async (name, updateData) => {

    const updatedUser = await User.findOneAndUpdate(
        { name },
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};



// Delete User By ID
const deleteUserById = async (id) => {

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw new Error("User not found");
    }

    return deletedUser;
};



// Delete User By Username
const deleteUserByUsername = async (name) => {

    const deletedUser = await User.findOneAndDelete({ name });

    if (!deletedUser) {
        throw new Error("User not found");
    }

    return deletedUser;
};

//login
const loginUser =
async (email, password) => {

    console.log("EMAIL:", email);

    console.log("PASSWORD:", password);




    const user =
    await User.findOne({ email });




    console.log("USER:", user);




    if (!user) {

        throw new Error(
            "Invalid credentials"
        );

    }




    const isMatch =
    await bcrypt.compare(

        password,

        user.password

    );




    console.log(
        "MATCH:",
        isMatch
    );




    if (!isMatch) {

        throw new Error(
            "Invalid credentials"
        );

    }




    const token =
    jwt.sign(

        {

            id: user._id,

            role: user.role

        },

        JWT_SECRET,

        {

            expiresIn: "7d"

        }

    );




    return {

        user,

        token

    };

};

module.exports = {
    registerUser,
    getAllUsers,
    getUserByUsername,
    updateUserById,
    updateUserByUsername,
    deleteUserById,
    deleteUserByUsername,
    loginUser
};
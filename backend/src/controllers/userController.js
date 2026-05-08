const userService = require("../services/userService");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/Users");




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userService.loginUser(email, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Register User
const registerUser = async (req, res) => {

    try {

        const user = await userService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Get All Users
const getAllUsers = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const users = await userService.getAllUsers(page, limit);

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get User By Username
const getUserByUsername = async (req, res) => {

    try {

        const user = await userService.getUserByUsername(req.params.username);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Update User By ID
const updateUserById = async (req, res) => {

    try {

        const updatedUser = await userService.updateUserById(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Update User By Username
const updateUserByUsername = async (req, res) => {

    try {

        const updatedUser = await userService.updateUserByUsername(
            req.params.username,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Delete User By ID
const deleteUserById = async (req, res) => {

    try {

        await userService.deleteUserById(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Delete User By Username
const deleteUserByUsername = async (req, res) => {

    try {

        await userService.deleteUserByUsername(req.params.username);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
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
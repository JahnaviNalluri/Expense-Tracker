const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");



// Register
router.post("/", userController.registerUser);
router.post(
   "/login",
   userController.loginUser
);


// Get All Users
router.get("/", userController.getAllUsers);



// Get User By Username
router.get("/username/:username", userController.getUserByUsername);



// Update User By ID
router.put("/id/:id", userController.updateUserById);



// Update User By Username
router.put("/username/:username", userController.updateUserByUsername);



// Delete User By ID
router.delete("/id/:id", userController.deleteUserById);



// Delete User By Username
router.delete("/username/:username", userController.deleteUserByUsername);



module.exports = router;
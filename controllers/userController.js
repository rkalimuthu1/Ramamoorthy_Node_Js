const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validateUserName } = require("../middleware/validateUser");
const { STATUS_CODE } = require("../const/httpStatusCode");
const {
    SUCCESSFUL_RESPONSE_CODE,
    SUCCESSFULLY_CREATED_RESPONSE_CODE,
    CLIENT_ERROR_RESPONSE_CODE,
} = STATUS_CODE;

//Add the User
const addUser = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const isValidUser = await validateUserName(username);
    if (!isValidUser) {
        const result = await User.create({ username });
        res.status(SUCCESSFULLY_CREATED_RESPONSE_CODE).json(result);
    } else {
        res.status(CLIENT_ERROR_RESPONSE_CODE).json(isValidUser);
    }
});

//Returns All the User details
const getUsersDetail = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(SUCCESSFUL_RESPONSE_CODE).json(users);
});

// Return single User
const getUserDetail = asyncHandler(async (_id) => {
    const result = await User.findById(_id);
    return result;
});

// Update the User records
const updateUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);
    if (!user) {
        req.status(STATUS_CODE.CLIENT_ERROR_RESPONSE_CODE);
        throw new Error("User Not Found");
    }
    const updateUser = await User.findByIdAndUppdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updateUser);
});

// Delete the User records
const deleteUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);
    if (!user) {
        req.status(STATUS_CODE.CLIENT_ERROR_RESPONSE_CODE);
        throw new Error("User Not Found");
    }
    const deletedUser = await User.remove(req.params._id);
    res.json(deletedUser);
});

module.exports = {
    getUserDetail,
    getUsersDetail,
    addUser,
    updateUserDetails,
    deleteUserDetails,
};

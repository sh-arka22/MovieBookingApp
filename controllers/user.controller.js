/**
 * This file will have all the logic to manipulate the User resource
 */
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter")
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");

/**
 * Update the user password
 *    - only USER should be allowed to do this
 */
 exports.updatePassword = async (req, res) => {

    try {
        const userId = req.userId;

        const user = await User.findOne({
            userId: userId
        });

        user.password = bcrypt.hashSync(req.body.newPassword, 8);

        const updatedUser = await user.save();

        res.status(200).send(objectConverter.userResponse([updatedUser]));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal server error while updating"
        })
    }
}

/**
 * Update the user - userType
 *    - only ADMIN/USER should be allowed to do this
 */
exports.updateUser = async (req, res) => {

    try {
        const userId = req.params.id;

        const user = await User.findOne({
            userId: userId
        });

        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.email = req.body.email != undefined ? req.body.email : user.email;
        user.address = req.body.address != undefined ? req.body.address : user.address;
        user.age = req.body.age != undefined ? req.body.age : user.age;

        const updatedUser = await user.save();

        res.status(200).send(objectConverter.userResponse([updatedUser]));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal server error while updating"
        })
    }
}
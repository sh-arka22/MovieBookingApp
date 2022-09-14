const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");

const isAdminOrValidOwner = async (req, res, next) => {
    try {
        /**
         * Fetcht user from the DB using the userId
         */
        const user = await User.findOne({
            userId: req.userId
        });

        // check if ADMIN or USER is valid OWNER
        if(user.userType != constants.userType.admin){
            if(user.userId != req.params.id){
                return res.status(403).send({
                    message: "Only the USER/ADMIN has access to this operation"
                })
            }
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }
};

const verifyUpdatePasswordRequestBody = async (req, res, next) => {
    try {

        if(!req.body.oldPassword){
            return res.status(400).send({
                message: "Old Password is required for authentication"
            });
        }

        if(!req.body.newPassword){
            return res.status(400).send({
                message: "New Password is required"
            });
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error " + err.message
        })
    }
};

const validateOldPassword = async (req, res, next) => {
    try {

        const user = await User.findOne({
            userId: req.userId
        });

        // We will do the password matching
        const isPasswordValid = bcrypt.compareSync(req.body.oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Old Password is not valid"
            })
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error " + err.message
        })
    }
};

const verifyUser = {
    isAdminOrValidOwner: isAdminOrValidOwner,
    verifyUpdatePasswordRequestBody: verifyUpdatePasswordRequestBody,
    validateOldPassword: validateOldPassword
};
module.exports = verifyUser;

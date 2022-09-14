const User = require("../models/user.model");

const verifyUserCreationRequestBody = async (req, res, next) => {
    try {

        if(!req.body.name){
            return res.status(400).send({
                message: "Name is required"
            });
        }

        if(!req.body.userId){
            return res.status(400).send({
                message: "UserId is required"
            });
        }else{
            const user = await User.findOne({
                userId: req.body.userId
            });

            if(user){
                return res.status(400).send({
                    message: "UserId already exist, kindly enter different userId"
                });
            }
        }

        if(!req.body.email){
            return res.status(400).send({
                message: "Email Id is required"
            });
        }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))){
            return res.status(400).send({
                message: "Email Id is not valid"
            });
        }else{
            const user = await User.findOne({
                email: req.body.email
            });

            if(user){
                return res.status(400).send({
                    message: "Email Id already exist, kindly enter different Email"
                });
            }
        }

        if(!req.body.password){
            return res.status(400).send({
                message: "Password is required"
            });
        }

        if(!req.body.address){
            return res.status(400).send({
                message: "Address is required"
            });
        }

        if(!req.body.age){
            return res.status(400).send({
                message: "Age is required"
            });
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyUserSigninRequestBody = async (req, res, next) => {
    try {

        if(!req.body.userId){
            return res.status(400).send({
                message: "UserId is required"
            });
        }
        if(!req.body.password){
            return res.status(400).send({
                message: "Password is required"
            });
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyUserAuthentication = {
    verifyUserCreationRequestBody: verifyUserCreationRequestBody,
    verifyUserSigninRequestBody: verifyUserSigninRequestBody
};
module.exports = verifyUserAuthentication;

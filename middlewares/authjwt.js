const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const constants = require("../utils/constants");

/**
 * Authentication
 * 
 *     - If the token passed is valid or no
 * 
 * 
 * 1. If no token is passed in the request header - Not Allowed
 * 2. If token is passed : AUthenticated
 *       if correct allow, else reject 
 */

verifyToken = (req,res, next) =>{
    /**
     * Read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        })
    }

    //If the token was provided, we need to verify it
    jwt.verify(token,config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        //I will try to read the userId from the decoded token and store it in req object
        req.userId = decoded.id;
        next();
    } )

};

verifyRefreshToken = (req,res, next) =>{
    /**
     * Read the token from the header
     */
     const refreshToken = req.headers['x-refresh-token'];

     if(!refreshToken){
         return res.status(401).send({
             message : "Refresh token not provided"
         })
     }
 
     //If the token was provided, we need to verify it
     jwt.verify(refreshToken,config.secret, (err, decoded)=>{
         if(err){
             return res.status(401).send({
                 message: "Unauthorized"
             });
         }
         //I will try to read the userId from the decoded token and store it in req object
         req.userId = decoded.id;
         next();
     });
};

/**
 * If the passed access token is of ADMIN or not
 */

isAdmin = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && user.userType == constants.userType.admin){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN role"
        })
    }
}

/**
 * If the passed access token is of ADMIN or not
 */

 isTheatreOwnerOrAdmin = async (req,res, next) =>{
    try {
        /**
         * Fetcht user from the DB using the userId
         */
        const user = await User.findOne({
            userId: req.userId
        });

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // check if ADMIN or USER is valid OWNER
        if(user.userType != constants.userType.admin){
            if(theatre.owner.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the THEATRE_OWNER/ADMIN has access to this operation"
                })
            }
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }
}


const authJwt = {
    verifyToken : verifyToken,
    verifyRefreshToken: verifyRefreshToken,
    isAdmin : isAdmin,
    isTheatreOwnerOrAdmin: isTheatreOwnerOrAdmin
};
module.exports= authJwt;
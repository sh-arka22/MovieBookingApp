/**
 * This file will hold the schema for the User resource
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");

 const userSchema = new mongoose.Schema({
 
     /**
      * name, userId, password, address, createdAt , updatedAt, age
      * ownedTheatres
      * userType [ ADMIN | CUSTOMER | THEATER_OWNER ]
      */
     name : {
         type : String,
         required : true
     },
     userId : {
         type : String,
         required : true,
         unique : true
     },
     email : {
        type : String,
        required : true,
        unique : true
    },
     password :{
         type : String,
         required : true
     },
     address : {
         city: {
             type: String,
             required: true
         },
         pinCode : {
            type : Number,
            required : true
        }
     },
     age: {
         type: Number,
         required: true
     },
     createdAt : {
         type : Date,
         immutable : true,
         default : ()=>{
             return Date.now();
         }
     },
     updatedAt : {
         type : Date,
         default : ()=>{
             return Date.now();
         }
     },
     userType : {
         type : String,
         required : true,
         default : constants.userType.customer,
         enum : [constants.userType.customer, constants.userType.admin, constants.userType.theatreOwner]
     },
     ownedTheatres : {
         type : [mongoose.SchemaTypes.ObjectId],
         ref : "Theatre"
     }
 });
 
 module.exports = mongoose.model("User", userSchema);
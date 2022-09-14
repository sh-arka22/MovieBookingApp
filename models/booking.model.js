 const constants = require('../utils/constants');
 const mongoose = require('mongoose');
 
 
 const bookingSchema = new mongoose.Schema({
     theatreId: {
         type: mongoose.SchemaTypes.ObjectId,
         ref : "Theatre"
     },
     movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Movie"
     },
     userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User"
     },
     showTime: {
        type: Date,
        required: true
     },
     noOfSeats: {
         type: Number,
         required: true
     },
     totalCost: {
        type: Number,
        required: true
     },
     status: {
        type: String,
        enum: [constants.bookingStatus.cancelled, constants.bookingStatus.completed, constants.bookingStatus.failed, constants.movieStatus.inProgress],
        default: constants.bookingStatus.inProgress
     },
     createdAt: {
         type: Date,
         default: () => {
             return Date.now();
         },
         immutable: true
     },
     updatedAt: {
         type: Date,
         default: () => {
             return Date.now();
         }
     } 
 })
 
 module.exports = mongoose.model("Booking", bookingSchema);
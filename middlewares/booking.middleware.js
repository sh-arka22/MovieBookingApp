const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const isValidBookingId = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "Booking Id Id is not valid"
            })
        }

        const booking = await Booking.findOne({
            _id: req.params.id
        });

        if (!booking) {
            return res.status(400).send({
                message: "Booking Id doesn't exist"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyInitiateBooking = async (req, res, next) => {
    try {

        const theatre = await Theatre.findOne({
            _id: req.body.theatreId
        });

        if (!theatre) {
            return res.status(400).send({
                message: "Theatre Id is not valid"
            })
        }

        if(!theatre.movies.includes(req.body.movieId)){
            return res.status(400).send({
                message: "Movie is not available in given theatre"
            });
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error " + err.message 
        })
    }
};

const verifyTheatreAndMovie = async (req, res, next) => {
    try {
        if(req.body.theatreId && !req.body.movieId){
            return res.status(400).send({
                message: "Please provide movie id if updating Theatre"
            })
        }

        if(req.body.theatreId && req.body.movieId){
            const theatre = await Theatre.findOne({
                _id: req.body.theatreId
            });
    
            if (!theatre) {
                return res.status(400).send({
                    message: "Theatre Id is not valid"
                })
            }
    
            if(!theatre.movies.includes(req.body.movieId)){
                return res.status(400).send({
                    message: "Movie is not available in given theatre"
                });
            }

        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error " + err.message 
        })
    }
};

const isOwnerOfBooking = async (req, res, next) => {
    try {
        /**
         * Fetcht user from the DB using the userId
         */
        const user = await User.findOne({
            userId: req.userId
        });

        const booking = await Booking.findOne({
            _id: req.body.bookingId
        });

        // check if ADMIN or USER is valid OWNER
        if(booking.userId.valueOf() != user._id.valueOf()){
            return res.status(400).send({
                message: "Only the BOOKING_OWNER/ADMIN has access to this operation"
            })
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }
};

const isAdminOrOwnerOfBooking = async (req, res, next) => {
    try {
        /**
         * Fetcht user from the DB using the userId
         */
        const user = await User.findOne({
            userId: req.userId
        });

        const booking = await Booking.findOne({
            _id: req.params.id
        });

        // check if ADMIN or USER is valid OWNER
        if(user.userType != constants.userType.admin){
            if(booking.userId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the BOOKING_OWNER/ADMIN has access to this operation"
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

const verifyBooking = {
    isValidBookingId: isValidBookingId,
    verifyInitiateBooking: verifyInitiateBooking,
    isAdminOrOwnerOfBooking: isAdminOrOwnerOfBooking,
    isOwnerOfBooking: isOwnerOfBooking,
    verifyTheatreAndMovie: verifyTheatreAndMovie
};
module.exports = verifyBooking;

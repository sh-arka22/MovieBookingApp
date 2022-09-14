const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const isValidTheatreId = async (req, res, next) => {
    try {

        // check whether TheatreId it is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({
                message: "Theatre Id Id is not valid"
            })
        }

        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        // check whether theatre exists or not
        if (theatre == null) {
            return res.status(400).send({
                message: "Theatre doesn't exist"
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

const verifyAddTheatre = async (req, res, next) => {
    try {

        const user = await User.findOne({
            userId: req.userId
        });
        if(user.userType == constants.userType.customer){
            return res.status(400).send({
                message: "Only THEATRE_OWNER/ADMIN is allowed to add theatre"
            })
        }

        if(!req.body.theatreOwnerId){
            return res.status(400).send({
                message: "Theatre Owner is required"
            })
        }else{
            const theatreOwner = await User.findOne({
                _id: req.body.theatreOwnerId
            });

            if(!theatreOwner){
                return res.status(400).send({
                    message: "Theatre Owner is not valid"
                })
            }
        }

        if (!req.body.name) {
            return res.status(400).send({
                message: "Theatre name is required"
            })
        }
        else if (!req.body.description) {
            return res.status(400).send({
                message: "Theatre description is required"
            })
        }
        else if (!req.body.city) {
            return res.status(400).send({
                message: "Theatre city location is required"
            })
        }
        else if (!req.body.pinCode) {
            return res.status(400).send({
                message: "Theatre pinCode is required"
            })
        }
        else if (!req.body.totalSeats) {
            return res.status(400).send({
                message: "Theatre Total Seats is required"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error " + err.message 
        })
    }
};

const areMoviesValid = async (req, res, next) => {
    try {
        if (req.body.movies.insert && req.body.movies.insert.length > 0) {
            const count = await Movie.countDocuments({
                _id: {
                    $in: req.body.movies.insert
                }
            });

            if (count != req.body.movies.insert.length) {
                return res.status(400).send({
                    message: "Some of the movies are not valid"
                })
            }
        }
        if (req.body.movies.remove && req.body.movies.remove.length > 0) {
            const count = await Theatre.countDocuments({
                _id: req.params.id,
                movies: {
                    $in: req.body.movies.remove
                } 
            });
            if (count != req.body.movies.remove.length) {
                return res.status(400).send({
                    message: "Some of the movies are not available in this theatre"
                })
            }
        }
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const isMovieAvailableInTheatre = async (req, res, next) => {
    try {

        const theatreHasMovie = await Theatre.findOne({
            _id: req.params.id,
            movies: {
                $in: req.params.movieId
            }
        });

        if (theatreHasMovie == null) {
            return res.status(200).send({
                message: "This movie is not available inside this theatre"
            })
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const verifyTheatre = {
    isValidTheatreId: isValidTheatreId,
    verifyAddTheatre: verifyAddTheatre,
    areMoviesValid: areMoviesValid,
    isMovieAvailableInTheatre: isMovieAvailableInTheatre
};
module.exports = verifyTheatre;

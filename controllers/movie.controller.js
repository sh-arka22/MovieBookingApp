/**
 * This file will contain the logic for movie controller
 */
const Movie = require("../models/movie.model");

/**
 * Getting all the movies
 * 
 *     127.0.0.1:8080/mba/api/v1/movies - All the movies
 *     
 *     Query params :
 *     Extensions : 
 *     127.0.0.1:8080/mba/api/v1/movies?name=<>
 *      
 *     127.0.0.1:8080/mba/api/v1/movies?releaseStatus=<>
 * 
 *     127.0.0.1:8080/mba/api/v1/movies?cast=<>
 *      
 */
exports.getAllMovies = async ( req, res) => {
    /**
     * TODO : Extensions
     */
    let queryObj = {};

    if(req.query.name && req.query.name != ""){
        queryObj.name = req.query.name
    }
    if(req.query.releaseStatus && req.query.releaseStatus != ""){
        queryObj.releaseStatus = req.query.releaseStatus
    }
    if(req.query.cast && req.query.cast != ""){
        queryObj.cast = {
            $in: req.query.cast
        }
    }


    const movies = await Movie.find(queryObj);
    res.status(200).send(movies);
}

/**
 * Controller for getting the movie based on id
 */
 exports.getOneMovie = async (req, res) => {
    try{
        // get movie based on id from database
        const movie = await Movie.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(movie);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * Controller for the creating a movie
 */
 exports.addMovie = async (req, res) => {

    // prepare movie object to store inside database
    const movieObj = {
        name: req.body.name,
        description: req.body.description,
        cast: req.body.cast,
        director: req.body.director,
        trailerUrls: req.body.trailerUrls,
        posterUrls: req.body.posterUrls,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        imdbRating: req.body.imdbRating
    }

    try {
        // insert movie object into database
        const movie = await Movie.create(movieObj);

        // return created movie
        return res.status(201).send(movie);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}


/**
 * Controller for updating a movie
 */
 exports.updateMovie = async (req, res) => {

    try{
        const movie = await Movie.findOne({
            _id: req.params.id
        });
    
        // check whether movie exists or not
        if (movie == null) {
            return res.status(400).send({
                message: "Movie doesn't exist"
            })
        }
    
        // update respective fields
        movie.name = req.body.name != undefined ? req.body.name : movie.name;
        movie.description = req.body.description != undefined ? req.body.description : movie.description;
        movie.cast = req.body.cast != undefined ? req.body.cast : movie.cast;
        movie.director = req.body.director != undefined ? req.body.director : movie.director;
        movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls : movie.trailerUrls;
        movie.posterUrls = req.body.posterUrls != undefined ? req.body.posterUrls : movie.posterUrls;
        movie.language = req.body.language != undefined ? req.body.language : movie.language;
        movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate;
        movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus;
        movie.imdbRating = req.body.imdbRating != undefined ? req.body.imdbRating : movie.imdbRating;
    
        // save updated object
        const updatedMovieObj = await movie.save();
    
        // return saved object
        return res.status(200).send(updatedMovieObj);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}


/**
 * Controller for deleting the movie
 */
 exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id
        });

        // check whether movie is valid or not
        if (movie == null) {
            return res.status(400).send({
                message: "Movie doesn't exist"
            })
        }

        // delete object from database
        await Movie.deleteOne({
            _id: req.params.id
        });

        res.status(200).send({
            message : "Movie succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}
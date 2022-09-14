/**
 * This file will contain the logic for theatre controller
 */
 const Theatre = require("../models/theatre.model");
 const User = require("../models/user.model");
 const Movie = require("../models/movie.model");

 /**
  * Getting all the theatres
  * 
    * Supporting the following query params
    * mba/api/v1/theatres?city=<>
    * 
    * mba/api/v1/theatres?pinCode=<>
    * 
  *      
  */
 exports.getAllTheatres = async ( req, res) => {

     let queryObj = {};
 
     if(req.query.city && req.query.city != ""){
         queryObj.city = req.query.city
     }
     if(req.query.pinCode && req.query.pinCode != ""){
         queryObj.pinCode = req.query.pinCode
     } 
 
     const theatres = await Theatre.find(queryObj);
     res.status(200).send(theatres);
 }
 
 /**
  * Controller for getting the theatre based on id
  */
  exports.getTheatre = async (req, res) => {
     try{
         // get theatre based on id from database
         const theatre = await Theatre.findOne({
             _id: req.params.id
         });
 
         // return found record
         res.status(200).send(theatre);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 }
 
 /**
  * Controller for the creating a theatre
  */
  exports.createTheatre = async (req, res) => {
 
     try {

        const theatreOwner = await User.findOne({
            _id: req.body.theatreOwnerId
        });

        // prepare theatre object to store inside database
        const theatreObj = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            totalSeats : req.body.totalSeats,
            movies: [],
            owner: req.body.theatreOwnerId,
            ticketPrice: req.body.ticketPrice
        }

         // insert theatre object into database
         const theatre = await Theatre.create(theatreObj);

         console.log(theatreOwner);
         theatreOwner.ownedTheatres.push(theatre._id);
         await theatreOwner.save();
 
         // return created theatre
         return res.status(201).send(theatre);
 
     } catch (err) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 
 }
 
 
 /**
  * Controller for updating a theatre
  */
  exports.updateTheatre = async (req, res) => {
 
     try{
         const theatre = await Theatre.findOne({ 
             _id: req.params.id
         });
  
         // update respective fields
         theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
         theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
         theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
         theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
         theatre.totalSeats = req.body.totalSeats != undefined ? req.body.totalSeats : theatre.totalSeats;
         theatre.ticketPrice = req.body.ticketPrice != undefined ? req.body.ticketPrice : theatre.ticketPrice;
     
         // save updated object
         const updatedTheatreObj = await theatre.save();
     
         // return saved object
         return res.status(200).send(updatedTheatreObj);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
     
 }
 
 
 /**
  * Controller for deleting the theatre
  */
  exports.deleteTheatre = async (req, res) => {
     try {
         // delete object from database
         await Theatre.deleteOne({
             _id: req.params.id
         });

         res.status(200).send({
             message : "Theatre succesfully deleted"
         });
     } catch (error) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 }

 /**
  * Controller for add/remove movies inside a theatre
  */
  exports.addOrRemoveMoviesInsideATheatre = async (req, res) => {
 
    try{
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });
    
        if(req.body.movies.remove && req.body.movies.remove.length > 0){
            for(let movieId of req.body.movies.remove){
                let removableIndex = theatre.movies.indexOf(movieId);
                if (removableIndex > -1) {
                    theatre.movies.splice(removableIndex, 1);
                }
            }
        }
        if(req.body.movies.insert && req.body.movies.insert.length > 0){
            theatre.movies.push(...req.body.movies.insert);
        }

        // save updated object
        const updatedTheatreObj = await theatre.save();
    
        // return saved object
        return res.status(200).send(updatedTheatreObj);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
  * Controller for getting all the movies inside a theatre
  */
 exports.getMoviesInsideATheatre = async (req, res) => {
 
    try{
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });

        let movies = [];
        console.log("theatre Movies", theatre.movies);
        if(theatre.movies.length>0){
            movies = await Movie.find({
                _id: {
                    $in : theatre.movies
                }
            });
        }

        // return movies available in theatre
        return res.status(200).send(movies);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
  * Controller for getting a specific movie inside a theatre
  */
 exports.getMoviesInsideATheatreBasedOnId = async (req, res) => {
 
    try{
        const movie = await Movie.findOne({
            _id: req.params.movieId
        });

        return res.status(200).send(movie);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}
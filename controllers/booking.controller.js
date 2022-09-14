/**
 * This file will contain the logic for booking controller
 */
 const Booking = require("../models/booking.model");
 const Payment = require("../models/payment.model");
 const User = require("../models/user.model");
const constants = require("../utils/constants");
const calculateBookingCost = require("../utils/calculateBookingCost");

 exports.getAllBookings = async ( req, res) => {
 
     const user = await User.findOne({
        _id: req.userId
    });

    let queryObj = {};

    if(user.userType != constants.userType.admin){
        queryObj.userId = user._id;
    }

     const bookings = await Booking.find(queryObj);
     res.status(200).send(bookings);
 }
 
  exports.getOneBooking = async (req, res) => {
     try{
         const booking = await Movie.findOne({
             _id: req.params.id
         });
 
         // return found record
         res.status(200).send(booking);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 }

  exports.initiateBooking = async (req, res) => {
 
     try {

        const user = await User.findOne({
            userId: req.userId
        });

        const bookingObj = {
            theatreId: req.body.theatreId,
            movieId: req.body.movieId,
            userId: user._id,
            showTime: req.body.showTime,
            noOfSeats: req.body.noOfSeats,
            totalCost: await calculateBookingCost(req.body.theatreId, req.body.noOfSeats)
         }

         const booking = await Booking.create(bookingObj);
 
         // Initiate setTimeout, when created booking
         setTimeout( async ()=>{
            console.log("Set Timeout triggered");
            
            const payment = await Payment.findOne({
                bookingId: booking._id
            });

            console.log("Payment Fetched", payment);

            if(!payment || payment.status == constants.paymentStatus.failed){
                booking.status = constants.bookingStatus.failed;        
                await booking.save();
            }
         
        },10000);

         return res.status(201).send(booking);
 
     } catch (err) {
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
 
 }
 
 
  exports.updateBooking = async (req, res) => {
 
     try{
         const booking = await Booking.findOne({
             _id: req.params.id
         });
     
         // update respective fields
         booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
         booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
         booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
         booking.totalCost = await calculateBookingCost(booking.theatreId, booking.noOfSeats);
     
         // save updated object
         const updatedBookingObj = await booking.save();
     
         // return saved object
         return res.status(200).send(updatedBookingObj);
     }catch(err){
         console.log(err.message);
         return res.status(500).send({
             message: "Some internal error"
         })
     }
     
 }
/**
 * This file will contain the logic for booking controller
 */
const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const notificationServiceClient = require("../utils/NotificationServiceClient");

exports.makePayment = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.body.bookingId
        });

        const user = await User.findOne({
            _id: booking.userId
        });

        const paymentObj = {
            bookingId: req.body.bookingId,
            amount: req.body.amount,
            status: constants.paymentStatus.success // Since we are not using any payment api, setting status by default as SUCCESS
        }

        const payment = await Payment.create(paymentObj);

        booking.status = constants.bookingStatus.completed;
        await booking.save();

        /**
         * call the notificationService to send the email
         * 
         * I need to have a client to call the external service
        */
        let content = `Your Movie Ticket Booking is Successful with Payment Id: ${payment._id}`;
        notificationServiceClient.sendEmail(payment._id, "Movie Booking Payment Confirmation", content, user.email, user.email);

        return res.status(201).send(payment);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

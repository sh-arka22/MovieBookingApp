const paymentController = require("../controllers/payment.controller")
const { authJwt, verifyBooking, verifyPayment } = require("../middlewares");


module.exports = (app)=>{

    /**
     * Create the routes for the corresponding controllers
     */
    // CREATE CALL
    app.post("/mba/api/v1/payments", [authJwt.verifyToken, verifyPayment.verifyBookingId, verifyBooking.isOwnerOfBooking],  paymentController.makePayment);

}

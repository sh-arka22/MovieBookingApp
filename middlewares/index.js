const verifyTheatre = require("./theatre.middleware");
const verifyUser = require("./user.middleware");
const authJwt = require("./authjwt");
const verifyBooking = require("./booking.middleware");
const verifyUserAuthentication = require("./auth.middleware");
const verifyPayment = require("./payment.middleware");

module.exports = {
    verifyTheatre,
    verifyUser,
    authJwt,
    verifyBooking,
    verifyUserAuthentication,
    verifyPayment
}
const constants = require('../utils/constants');
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Booking"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [constants.paymentStatus.completed, constants.paymentStatus.inProgress, constants.paymentStatus.failed],
        default: constants.movieStatus.inProgress
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

module.exports = mongoose.model("Payment", paymentSchema);
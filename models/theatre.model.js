const mongoose = require("mongoose");


const theatreSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pinCode : {
        type : Number,
        required : true
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
    },
    totalSeats : {
        type : Number,
        required : true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Theatre", theatreSchema);
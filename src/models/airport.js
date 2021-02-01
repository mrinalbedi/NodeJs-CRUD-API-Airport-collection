import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
    Airport_Code: {
        type: String,
        required: true,
        length: 3
    },
    Phone_Number: {
        type: Number,
        required: true,
        length:10
    },

});

const Airport = mongoose.model('Airport', airportSchema, 'Airport');

export default Airport
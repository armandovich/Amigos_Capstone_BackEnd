import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    photo: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    brand:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    },
    address:{
        required: true,
        type: String
    },
    latitude:{
        required: true,
        type: Number
    },
    longitude:{
        required: true,
        type: Number
    },
    doors:{
        required: true,
        type: Number
    },
    seats:{
        required: true,
        type: Number
    },
    fuel:{
        required: true,
        type: String
    },
    transmition:{
        required: true,
        type: String
    },
    tires:{
        required: true,
        type: String
    },
    cc:{
        required: false,
        type: Number
    },
    max_speed:{
        required: false,
        type: Number
    },
    score: {
        required: false,
        type: Number
    },
    reviews: {
        required: false,
        type: Number
    },
    owner_id: {
        required: true,
        type: String
    },
    available: {
        require: false,
        type: Boolean
    }
})

export default mongoose.model('cars', dataSchema)
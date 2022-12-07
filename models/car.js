import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    },
    brand:{
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
    score:{
        required: false,
        type: Number
    },
    owner_id:{
        required: true,
        type: String
    }

})

export default mongoose.model('cars', dataSchema)
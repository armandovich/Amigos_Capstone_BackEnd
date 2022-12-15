import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    car_id: {
        required: true,
        type: String
    },
    car_owner_id:{
        required: true,
        type: String
    },
    car_name:{
        required: true,
        type: String 
    },
    car_brand:{
        required: true,
        type: String   
    },
    car_photo: {
        required: true,
        type: String
    },
    renter_id: {
        required: true,
        type: String
    },
    renter_photo: {
        required: true,
        type: String
    },
    renter_name: {
        required: true,
        type: String
    },
    cost: {
        required: true,
        type: Number
    },
    start_date: {
        require: true,
        type: Date
    },
    end_date: {
        require: true,
        type: Date
    },
})

export default mongoose.model('trips', dataSchema)
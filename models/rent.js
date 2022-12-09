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
    start_date: {
        require: true,
        type: Date
    },
    end_date: {
        require: true,
        type: Date
    },
    owner_id:{
        required: true,
        type: String
    },
    renter_id:{
        required: true,
        type: String
    }
})

export default mongoose.model('rents', dataSchema)
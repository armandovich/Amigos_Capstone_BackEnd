import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    avatar: {
        require: true,
        type: String
    },
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    renter_id:{
        required: true,
        type: String
    },
    car_owner_id:{
        required: true,
        type: String
    }
})

export default mongoose.model('chats', dataSchema)
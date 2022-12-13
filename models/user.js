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
    country: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: false,
        type: Boolean
    }
})

export default mongoose.model('users', dataSchema)
const { Int32 } = require('bson')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    phone:{

        type:String,
        required:[true, 'Please enter your phone']
    },
    image: {
       type:String
    },
    AccountStatus: {
        type: Boolean,
        default: true
    }
},
{   collection: 'Users',
    timestamp: true
}) 

module.exports = mongoose.model('Users', userSchema)
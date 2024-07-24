const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true, 'name is required']
    },
    email: {
        type: String,
        required : [true, 'email is required']
    },
    password: {
        type: String,
        required : [true, 'password is required']
    }, 
    blogs:[ {
        type: mongoose.Types.ObjectId,
        // User is name of user model 
        ref: 'Blog',
    },
    ]
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel
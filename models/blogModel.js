const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true, 'title is required']
    },
    description: {
        type: String,
        required : [true, 'description is required']
    },
    image: {
        type: String,
        // required : [true, 'image is required']
    },
    user: {
        // we will get user from userModel
        type: mongoose.Types.ObjectId,
        // User is name of user model 
        ref: 'User',
        require:[true, "user id is required"]
    }
},{timestamps: true})

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
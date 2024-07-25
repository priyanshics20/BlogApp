const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

// get all blogs
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blog found",
            })
        }
        return res.status(200).send({
            success: true,
            blogLenght : blogs.length,
            message: "All blogs fetched successfully",
            blogs,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: flase,
            message: "Error while getting all blogs",
            error,
        })
    }
}

// create blog 
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        if (!title || !description || !user) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            })
        }

        const newBlog = new blogModel({title , description , image, user})
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();

        return res.status(200).send({
            success: true,
            message: "Blog created successfully",
            newBlog
        })

    } catch (error) {
        session.abortTransaction();
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while creating blog",
            error,  
        })
    }
}

// update blog 
exports.updateBlogController = async (req, res) => {
    try {
        const id = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        });      
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while updating blog",
            error,
        })
    }
}

// DELETE BLOG
exports.deleteBlogController = async (req, res)=>{
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!",
        });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error while deleting blog',
            error,
        })
    }
}

// get user blog 
exports.userBlogController = async (req, res) => {
//     try {
//         const userBlog = await userModel.findById(req.params.id).populate('blogs');
//         if (!userBlog) {
//             return res.status(404).send({
//               success: false,
//               message: "blogs not found with this id",
//             });
//         }
//           return res.status(200).send({
//             success: true,
//             message: "user blogs",
//             userBlog,
//         });
//     }
//     catch (error) {
//         console.log(error)
//         return res.status(500).send({
//             success: false,
//             message: 'Error while getting user blog',
//             error,
//         })
//     }
}
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// register user 
exports.registerController = async (req, res)=>{
    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message : "Please fill all the fields"
            })
        }
        // if user already exist 
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // save new user 
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'user registered successfully',
            user
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: `error in registration ${error.message}`,
            error
        })
    }
}

// get all users

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            totalUsers: users.length,
            success: true,
            message: "all users data fetched successfully",
            users,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: `Error in getting users ${error.message}`,
            error
        })
    }
}

// login user
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { 
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message:"User does not exist"
            })
        }
        // match password 
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user: user._id
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: `Error in login ${error.message}`,
            error
        })
    }
}
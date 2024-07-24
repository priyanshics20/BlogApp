const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect to Mongodb Database`.bgMagenta.white)
    }
    catch (error) {
        console.log(`MONGO Connect Error`.bgRed.white)
    }
}

module.exports = connectDB
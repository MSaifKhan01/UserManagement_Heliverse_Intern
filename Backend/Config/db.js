const mongoose=require("mongoose")

require("dotenv").config()


const connecting=mongoose.connect(process.env.mongoUrl)

module.exports={connecting}
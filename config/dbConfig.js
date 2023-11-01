const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://Vipul123:Vipul200@cluster0.tk37tbh.mongodb.net/"
)

const connection = mongoose.connection

connection.on("connected", () => {
  console.log("MongoDB connection is successful")
})

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error)
})

module.exports = mongoose


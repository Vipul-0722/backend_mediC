const express = require("express")
const app = express()
require("dotenv").config()
const s3Router = require("./s3Upload.js")
const dbConfig = require("./config/dbConfig")
app.use(express.json())
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const doctorRoute = require("./routes/doctorsRoute")
const path = require("path")

app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/doctor", doctorRoute)
app.use("/image", s3Router)
const port = process.env.PORT || 5000

app.get("/", (req, res) => res.send("Hello World!"))
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`))


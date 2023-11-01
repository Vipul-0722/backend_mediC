// type="module"
const express = require("express")
const multer = require("multer")
const multers3 = require("multer-s3")
const AWS = require("aws-sdk")
require("dotenv").config()

const BUCKET_NAME = process.env.BUCKET_NAME
const REGION = process.env.REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
  region: REGION,
})

const uploadwithMulter = () =>
  multer({
    storage: multers3({
      s3: s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname })
      },
      key: function (req, file, cb) {
        cb(null, file.originalname)
      },
    }),
  }).array("s3images", 1)

uploadtoAws = (req, res) => {
  const upload = uploadwithMulter()
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      res.json({ err, msg: "error" })
      return
    }
    res.json({ msg: "files uploaded successfully" })
  })
}

fetchImages = (req, res) => {
  s3.listObjects({ Bucket: BUCKET_NAME })
    .promise()
    .then((data) => {
      console.log(data)
      let baseURL = "https://medi-connect-app.s3.ap-south-1.amazonaws.com/"
      let urlArr = data.Contents.map((e) => baseURL + e.Key)
      res.status(200).json({ urlArr })
    })
}

const router = express.Router()

router.post("/upload", uploadtoAws)
router.get("/fetchallImages", fetchImages)
router.get("/hey", (req, res) => res.send("Hello World!"))

module.exports = router


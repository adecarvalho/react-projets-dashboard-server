const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { checkTokenSetUser, isLoggedIn } = require("./middlewares/index.js")
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()

//functions
function notFound(res, res, next) {
  const error = new Error("Route Not Found ...")
  res.status(404)
  next(error)
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500)

  res.json({
    message: error.message
    //stack: error.stack
  })
}

//database
mongoose
  //.connect(process.env.MONGO_DB_URI_LOCALHOST, { useNewUrlParser: true })
  .connect(process.env.MONGO_DB_URI_ATLAS, { useNewUrlParser: true })

  .then(db => {
    console.log("database connected ...")
  })
  .catch(error => {
    console.log(error)
  })

//midlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(checkTokenSetUser)

//routes
app.use("/api/dashboard/auth", require("./routes/auth"))

app.use("/api/dashboard/sujets", require("./routes/sujetRoute"))

app.use("/api/dashboard/posts", require("./routes/postRoute"))

//privtes routes
/* app.get("/api/dashboard/posts", isLoggedIn, (req, res) => {
  res.json({
    user: req.user,
    posts: []
  })
}) */

app.use(notFound)
app.use(errorHandler)

//
app.listen(PORT, () => {
  console.log(`Server liten on port: ${PORT}`)
})

const jwt = require("jsonwebtoken")
//
function isLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    const error = new Error("🚫INTERDITION ")
    res.status(401)
    next(error)
  }
}

//
function checkTokenSetUser(req, res, next) {
  const authHeader = req.get("Authorization")
  if (authHeader) {
    //
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        console.log(error)
      } else {
        req.user = user
      }
    })
    next()
  } else {
    next()
  }
}

//
module.exports = {
  checkTokenSetUser,
  isLoggedIn
}

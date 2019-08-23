const router = require("express").Router()
const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { validationRegister, validationLogin } = require("./validation")

//
function respondError422(res, next) {
  res.status(422)
  const error = new Error("Connexion Impossible ! Verifier vos données")
  next(error)
}

//
function respondError422NotUnique(res, next) {
  res.status(422)
  const error = new Error("Enregistrement Impossible ! Le compte existe")
  next(error)
}

//
function createTokenAndResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  }

  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        const error = new Error("Connexion Impossible")
        res.status(422)
        next(error)
      } else {
        res.json({ token, payload })
      }
    }
  )
}

//
router.post("/register", async (req, res, next) => {
  //validate req.body
  let error = undefined
  const isval = validationRegister(req.body)
  //
  if (isval.error) {
    error = new Error(isval.error.details[0].message)
    res.status(422)
    next(error)
  } else {
    try {
      //email disponible ?
      const content = await User.find({ email: req.body.email })
      if (content.length > 0) {
        respondError422NotUnique(res, next)
      } else {
        //save user in db with hash password
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(req.body.password, salt)

        const newuser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashpassword
        })

        const val = await newuser.save()

        createTokenAndResponse(val, res, next)
      }
    } catch (error) {
      res.status(422)
      error = new Error(error.message)
      next(error)
    }
  }
})

/** */
router.post("/login", async (req, res, next) => {
  console.log("user:", req.user)
  let error = undefined
  const isval = validationLogin(req.body)
  if (isval.error) {
    error = new Error(isval.error.details[0].message)
    res.status(422)
    next(error)
  } else {
    try {
      //cherche user dans la base
      const zeuser = await User.findOne({ email: req.body.email })
      //email not found
      if (!zeuser) {
        respondError422(res, next)
      } else {
        //password match
        const validpass = await bcryptjs.compare(
          req.body.password,
          zeuser.password
        )
        if (!validpass) {
          respondError422(res, next)
        } else {
          createTokenAndResponse(zeuser, res, next)
        }
      }
    } catch (error) {
      res.status(422)
      error = new Error(error.message)
      next(error)
    }
  }
})

//
module.exports = router

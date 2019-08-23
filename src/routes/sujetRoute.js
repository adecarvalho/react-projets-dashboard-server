const router = require("express").Router()
const SujetModel = require("../models/sujet")

const { validationSujet } = require("./validation")

//get all sujets
router.get("/", async (req, res, next) => {
  //
  try {
    const results = await SujetModel.find().sort({ name: 1 })

    res.status(200)
    res.json(results)
  } catch (error) {
    res.status(422)
    error = new Error(error.message)
    next(error)
  }
})

//create new sujet
router.post("/", async (req, res, next) => {
  const isval = validationSujet(req.body)

  if (isval.error) {
    error = new Error(isval.error.details[0].message)
    res.status(422)
    next(error)
  } else {
    try {
      //
      const newSujet = new SujetModel({
        name: req.body.name,
        description: req.body.description
      })

      const val = await newSujet.save()

      res.status(200)
      res.json(val)
      //
    } catch (error) {
      res.status(422)
      error = new Error(error.message)
      next(error)
    }
  }
})

//find sujet by id
router.get("/:id", async (req, res, next) => {
  try {
    const result = await SujetModel.findOne({ _id: req.params.id })

    res.status(200)
    res.json(result)
    //
  } catch (error) {
    res.status(422)
    error = new Error("Sorry not Found")
    next(error)
  }
})

//delet sujet by id
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await SujetModel.findOneAndRemove({ _id: req.params.id })

    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(422)
    error = new Error("Sorry not Found")
    next(error)
  }
})

//
module.exports = router

const router = require("express").Router()
const PostModele = require("../models/post")

const { validationPost } = require("./validation")

//get posts visa (visa==false)
router.get("/visa", async (req, res, next) => {
  try {
    const results = await PostModele.find({ visa: false }).sort({
      create_at: -1
    })

    res.status(200)
    res.json(results)
  } catch (error) {
    res.status(422)
    error = new Error(error.message)
    next(error)
  }
})

//get all posts
router.get("/", async (req, res, next) => {
  //
  try {
    const results = await PostModele.find().sort({ create_at: -1 })

    res.status(200)
    res.json(results)
  } catch (error) {
    res.status(422)
    error = new Error(error.message)
    next(error)
  }
})

//create new post
router.post("/", async (req, res, next) => {
  const isval = validationPost(req.body)

  if (isval.error) {
    error = new Error(isval.error.details[0].message)
    res.status(422)
    next(error)
  } else {
    try {
      //
      const newPost = new PostModele({
        sujetId: req.body.sujetId,
        userName: req.body.userName,
        description: req.body.description
      })

      const val = await newPost.save()

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

//find post by id
router.get("/:id", async (req, res, next) => {
  try {
    const result = await PostModele.findOne({ _id: req.params.id })

    res.status(200)
    res.json(result)
    //
  } catch (error) {
    res.status(422)
    error = new Error("Sorry not Found")
    next(error)
  }
})

//find posts by sujetId
router.get("/sujet/:id", async (req, res, next) => {
  try {
    const result = await PostModele.find({ sujetId: req.params.id }).sort({
      create_at: -1
    })
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(422)
    error = new Error("Sorry not Found")
    next(error)
  }
})

//delet post by id
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await PostModele.findOneAndRemove({ _id: req.params.id })

    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(422)
    error = new Error("Sorry not Found")
    next(error)
  }
})

//visa post by id
router.put("/:id", async (req, res, next) => {
  try {
    const result = await PostModele.findOneAndUpdate(
      { _id: req.params.id },
      { remarque: req.body.remarque, visa: true }
    )

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

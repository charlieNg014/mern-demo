const router = require('express').Router();
const Exercise =  require('../models/exercise.model');      //require the model


//handle incoming the get request and the find all exercises and return in json format 
router.get("/", function(req, res) {
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err))
})

//post any new request
router.post("/add", function(req, res) {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(() => res.json("New exercise add"))
    .catch(err => res.status(400).json("Error: " + err))
})

//get specific id
router.get("/:id", function(req, res) {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err))
})

//delete specific id
router.delete("/:id", function(req, res) {
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Exercises deleted"))
    .catch(err => res.status(400).json("Error: " + err))
})

//update the specific id
router.post("/update/:id", function(req, res) {
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json("Exercise updated"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;




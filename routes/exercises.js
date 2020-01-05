const router = require('express').Router;
const Exercise =  require('../models/exercise.model');      //require the model


//handle incoming the get request and the find all exercises and return in json format 
router.route("/").get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res)=> {
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

    //save the new exercise
    newExercise.save()
    .then(()=> res.json("Exercise added"))
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;




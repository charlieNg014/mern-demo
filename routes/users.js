const router = require('express').Router();
let User = require('../models/user.model');     //require the model


//first route, hanlding incoming get request to find the users
router.get("/", function(req, res){
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err))
})

//if the post request, then we create new instance of User and save it to DB
router.post("/add", function(req, res) {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
    .then(() => res.json("User added"))
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;
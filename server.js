const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to db
//we can set the database latter on by adding at the end 
const url = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection; 
db.once('open', _ => {
    //log if successul connection 
    console.log("Successful", url);

    //log if fail
    db.on('error', err => {
        console.error('connection error:', err)
      })
})

//require files to routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';

//re-usable item
import Navbar from "./components/Navbar";
import ExercisesList from './components/ExerciseList';
import EditExercise from "./components/EditExercise";
import CreateUser from './components/CreateUser'; 
import CreateExercise from './components/CreateExercise';


function App() {
  return (
    <Router>
    <div className="container"> 
      <Navbar />
      <br/>
      <Route path="/" exact component = {ExercisesList} /> 
      <Route path="/edit/:id" exact component = {EditExercise} />
      <Route path="/create" exact component = {CreateExercise} /> 
      <Route path="/user" exact component = {CreateUser} />     
    </div>
    </Router>
  );
}

export default App;

import React, { Component } from 'react'
import Axios from 'axios';
import {Link} from  'react-router-dom';

//exercise component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>   
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | 
            <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>  
    </tr>
)

export default class ExerciseList extends Component {
    //setup the state
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount() {
        Axios.get("http://localhost:5000/exercises/")
        .then(response => {
            this.setState({ exercises: response.data })})
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        Axios.delete("http://localhost:5000/exercises/" + id)
        .then(res => console.log(res.data))

        //set the new array of exercises
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    } 

    

    //map through the exercise list
    ExerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise = {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ExerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

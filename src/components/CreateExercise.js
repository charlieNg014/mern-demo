import React, { Component } from 'react'
import DatePicker from "react-date-picker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import axios from 'axios';

export default class CreateExercise extends Component {
    //declare the state
    constructor(props) {
        super(props);

        //bind the 'this' to this method
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //
    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // })

        //getting all users and then display
        axios.get("http://localhost:5000/users/")
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username), 
                    username: response.data[0].username
                })
            }
        })
    }

    //declare function 
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data))

        this.setState({
            duration: 0,
            description: " "
        })
        // window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    {/* username input  */}
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="UserInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        >
                            {this.state.users.map(function(user) {
                                return (
                                <option key={user} value={user}>{user}</option>
                                )
                            })}
                        </select>
                    </div>
                    
                    {/* description */}
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    {/* duration  */}
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    
                    {/* date pickup  */}
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected = {this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    {/* submit button  */}
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" onClick={this.onSubmit}/>  
                    </div>
                </form>
            </div>
        )
    }
}

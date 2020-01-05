import React, { Component } from 'react'

export default class CreateUser extends Component {
    //declare the state
    constructor(props) {
        super(props);

        //bind the 'this' to this method
        this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangeDuration = this.onChangeDuration.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            // description: "",
            // duration: 0,
            // date: new Date(),
            // users: []
        }
    }

    //
    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'test user'
        })
    }

    //declare function 
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            // description: this.state.description,
            // duration: this.state.duration,
            // date: this.state.date
        }

        console.log(user);

        // window.location = "/";
        this.setState({
            username: " "
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User Log</h3>
                <form onSubmit={this.onSubmit}>
                    {/* username input  */}
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            type= "text"
                            required
                            className = "form-group"
                            value = {this.state.username}
                            onChange = {this.onChangeUsername}
                        />
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

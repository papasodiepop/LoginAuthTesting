import React from 'react'
import axios from 'axios'
import logo from '../logo.svg'

const initialState = {
    apiResponse: '',
    username: '',
    password: '',
    email: '',
    usernameError: '',
    passwordError: ''
}
class createUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
        let usernameError = ''
        let passwordError = ''
        let emailError = ''
        let passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
        let emailValidation = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm
        let usernameValidation = /^([A-Za-z0-9]){4,20}$/gm

        if (usernameValidation.test(this.state.username) !== true) {
            console.log(
                'Username: ' + usernameValidation.test(this.state.username)
            )
            usernameError = 'Username is blank.'
        }
        if (emailValidation.test(this.state.email) !== true) {
            console.log('Email: ' + emailValidation.test(this.state.email))
            emailError = 'Email is blank.'
        }

        if (passwordValidation.test(this.state.password) !== true) {
            console.log(
                'Password: ' + passwordValidation.test(this.state.password)
            )
            passwordError = 'Password field is blank.'
        }

        if (usernameError || passwordError || emailError) {
            this.setState({ usernameError, passwordError, emailError })
            return false
        }
        console.log(
            'Username: ' +
                usernameValidation.test(this.state.username) +
                '\nPassword: ' +
                passwordValidation.test(this.state.password)
        )
        return true
    }

    handleSubmit(event) {
        event.preventDefault()
        const isValid = this.validate()
        const loginData = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        if (isValid) {
            axios
                .post('http://localhost:9000/createUser', loginData)
                .then(res => console.log(res.data))
            console.log(loginData)
            this.setState(initialState)
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label>Create User</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter a username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <div className="errorMessage">
                            {this.state.usernameError}
                        </div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter an Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div className="errorMessage">
                            {this.state.emailError}
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter a Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div className="errorMessage">
                            {this.state.passwordError}
                        </div>
                        <div className="validationRequirements">
                            <h3>Password Needs:</h3>
                            <ul>
                                <li>At least 8 characters.</li>
                                <li>At least one captial letter</li>
                                <li>At least one number</li>
                            </ul>
                        </div>
                        <button type="Submit">Login</button>
                        <button type="reset">Clear</button>
                    </form>
                </header>
            </div>
        )
    }
}

export default createUser

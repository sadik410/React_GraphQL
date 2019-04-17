import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from '../../queries'
import Error from '../Error'


const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}
class Signup extends Component {
    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState })
    }
    handleChange = ({ target: { name, value } }) => {

        this.setState({ [name]: value })
        console.log(this.state)


    }
    handleSubmit = (event, singupUser) => {
        event.preventDefault();
        singupUser().then(async({data}) => {
            console.log('data', data)
            localStorage.setItem('token',data.singupUser.token)
            await this.props.refetch

            this.clearState()
            this.props.history.push('/')


        })

    }
    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state
        const isInvalidate = !username || !email || !password || password != passwordConfirmation
        console.log('isInvalidate', isInvalidate)
        return (isInvalidate)
    }
    render() {
        const { username, email, password, passwordConfirmation } = this.state
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{
                    username, email, password
                }}>
                    {(singupUser, { data, loading, error }) => {
                        console.log(data, loading, error)
                        return (
                            <form className="form" onSubmit={(event) => this.handleSubmit(event, singupUser)}>

                                <input type="text" name="username" value={this.state.name} placeholder="username" onChange={this.handleChange} />
                                <input type="email" name="email" value={this.state.email} placeholder="email adress" onChange={this.handleChange} />
                                <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                                <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder="confirm Passowrd" onChange={this.handleChange} />

                                <button type="submit"
                                    className="button-primary"
                                    disabled={loading || this.validateForm()}>
                                    submit
                                    </button>
                                {error && <Error error={error} />}
                            </form>

                        )
                    }

                    }
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signup);
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { compose,graphql } from 'react-apollo';
import { gql } from 'apollo-boost'

import { SIGNIN_USER } from '../../queries'
const initialState = {
    username: "",
    password: ""
}

class Signin extends Component {

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }



    handleSubmit = (event) => {

        event.preventDefault();
        const { username, password } = this.state
        this.props.signIn({ variables: { username, password } }).then(async({data}) => {
            console.log(data)
            localStorage.setItem('token',data.singinUser.token)
            await this.props.refetch
            this.props.history.push('/')
        }).catch(err=>{
            console.log('err', err.message)
        })
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    render() {


        return (
            // <Mutation mutation={SIGNIN_USER} variables={{
            //     username, password
            // }}>
            <div className="App">
                <h2 className="App">Signin</h2>
                <form className="form" onSubmit={(event) => this.handleSubmit(event)}>

                    <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />

                    <button type="submit"
                        className="button-primary"

                    >
                        submit
                </button>
                </form>
                {this.props.data}

            </div>

        )
    }
}


export default compose(graphql(SIGNIN_USER, { name: "signIn" })) (withRouter(Signin));
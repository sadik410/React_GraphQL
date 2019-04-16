import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import {gql}  from 'apollo-boost'
 
import {SIGNIN_USER} from '../../queries'
const initialState ={
    username:"",
    password:""
}

class Signin extends Component {


    

    handleSubmit=(event )=>{

        event.preventDefault();
        const { username, password } = this.state
        this.props.signIn({variables:{username, password }}).then(data=>{
            console.log(data)
        })
    }
    handleChange=({target:{name,value}})=>{
this.setState({[name]:value})
    }

    render() {
        

        return (
            // <Mutation mutation={SIGNIN_USER} variables={{
            //     username, password
            // }}>
                <form className="form" onSubmit={(event) => this.handleSubmit(event)}>

                    <input type="text" name="username"  placeholder="username" onChange={this.handleChange} />
                    <input type="password" name="password"  placeholder="Password" onChange={this.handleChange} />

                    <button type="submit"
                        className="button-primary"
                        
                        >
                        submit
                </button>
                </form>
            
        )
    }
}


export default graphql(SIGNIN_USER, {name:"signIn"})(Signin);
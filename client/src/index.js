import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
//Component
import App from './components/App';
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'
import Navbar from './components/Navbar'
import Search from './components/Recipe/Search'
import Profile from './components/Profile/Profile'
import AddRecipe  from './components/Recipe/AddRecipe'
import withSession from  './components/withSession'


import ApolloClient from 'apollo-boost'

import { ApolloProvider } from 'react-apollo'


const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions :{
        credentials:'include'
    },
    request:operation=>{
        const token =localStorage.getItem('token')
        operation.setContext({
            headers:{
                authorization :token
            }
        })
    },
    onError:({networkError})=>{
        if(networkError){
            console.log('Network Error',networkError);
            if(networkError.statusCode=== 401){

            }
        }
    }

})

const Root = ({refetch}) => (
    <Router>
        <Fragment>
        <Navbar/>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/search"  component={Search} />
            <Route path="/signin" render={()=> <Signin refetch={refetch}/>} />
            <Route path="/signup" render={()=> <Signup refetch={refetch}/>} />
            <Route path="/profile"  component={Profile} />
            <Route path="/recipe/add"  component={AddRecipe} />

            <Redirect to="/" />
        </Switch>
        </Fragment>
    </Router>
);

const RootWithSession= withSession(Root)
ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


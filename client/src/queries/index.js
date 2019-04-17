import { gql } from 'apollo-boost';

/* Reciês Queries*/
export const GET_ALL_RECIPES = gql`

 query {
    getAllRecipes{
        name
        category
        description
        instructions
        createdDate
        likes
    }
 }
`;

/* Recipes Mutations */



/* User Queries*/
export const GET_CURRENT_USER = gql `
query{
    getCurrentUser{
        username
        joinDate
        email
    }
}
`

/* User Mutations */
export const SIGNIN_USER = gql`
mutation($username:String!,$password:String!){
    singinUser(username:$username ,password:$password){
      token
    }
  }
`

export const SIGNUP_USER = gql`

mutation($username:String!,$email:String!,$password:String!){
    singupUser(username:$username,email:$email
      ,password:$password){
      token
    }
  }
`

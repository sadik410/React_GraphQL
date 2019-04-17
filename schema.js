exports.typeDefs= `
type Recipe{
    _id:ID
    name: String! 
    category: String! 
    description: String!
    instructions: String! 
    createdDate: String! 
    likes: Int 
    username: String 



}


type User{
    _id:ID
    username: String! @unique
    password: String!
    email: String!
    joinDate : String
    favorites : [Recipe]
}

type Query {
getAllRecipes: [Recipe]
getCurrentUser: User
}


type Token{
 token:String
}

type Mutation {
    addRecipe(name:String!, description: String!, category: String!,
        instructions: String!, username: String
        ): Recipe

        singinUser(username: String! ,password: String!):Token    
    

    singupUser(username: String!, email:String! ,password: String!):Token    
    }

`;
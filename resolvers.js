//singUp
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const createToken = (user, secret, expiresIn) => {

    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn })
}


exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {

            const allRecipes = await Recipe.find();

            return allRecipes
        },
        getCurrentUser : async (root,args,{currentUser , User})=>{
            if(!currentUser){
                console.log('currentUser',currentUser)
                return null;
            }
            const user = await User.findOne({username:currentUser.username})
            .populate({
                path: 'favorites',
                model :'Recipe'
            });
            return user;
        }
    },
    Mutation: {
        addRecipe: async (root, { name, description, category,
            instructions, username }, { Recipe }) => {

            newRecipe = await new Recipe({
                name, description, category,
                instructions, username

            }).save()

            return newRecipe
        },

        singinUser: async (root, { username, password }, { User }) => {

            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found')
            }
            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                throw new Error('Invalide password')
            }

            return { token: createToken(user, process.env.SECRET, '1hr') }
        }
        ,
        singupUser: async (root, { username, email, password }, { User }) => {

            const user = await User.findOne({ username });

            if (user) {
                throw new Error('User already exists');
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '1hr') }



        }
    }
};
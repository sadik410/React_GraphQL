import React from 'react'



const Error =({error})=>

{
    console.log('error',error)
    return  <p>{error.message}</p>
}

export default Error;
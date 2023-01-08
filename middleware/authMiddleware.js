const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    //check if token exists and verify it
    if (token){
        jwt.verify(token, 'natitedros secret', (err, decodedToken) => {
            if (err){
                console.log(err)
                res.redirect('../../login')
            }
            else{
                //what we want
                next()
            }
        })
    }
    else{
        res.redirect('../../login')
    }
}

//check if user is logged in and send the user details to the front end if so
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, 'natitedros secret', async (err, decodedToken) => {
            if (err){
                console.log(err)
                res.locals.user = null
                next()
            }
            else{
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }
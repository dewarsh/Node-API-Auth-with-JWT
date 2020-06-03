const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Auth API'
    })
})

//Route to be protected using JWT
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post Created...',
                authData
            })
        }
    })   
})

//Route created to get the token (JWT)
app.post('/api/login', (req, res) => {
    
    //Creating a Mock user
    const user = {
        id: 1,
        username: 'dev',
        email: 'dev@gmail.com'
    }

    //Creating a token for that particular user
    jwt.sign({user: user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token: token
        })
    })
})

//FORMAT of Token
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //split at the space as per the above FORMAT
        const bearer = bearerHeader.split(' ')
        //get the token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //Next middleware
        next()
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server running on port 5000'))
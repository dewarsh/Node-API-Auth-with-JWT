const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Auth API'
    })
})

//Route to be protect using JWT
app.post('/api/posts', verifyToken, (req, res) => {
    res.json({
        message: 'Post Created...'
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
    jwt.sign({user: user}, 'secretKey', (err, token) => {
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

    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server running on port 5000'))
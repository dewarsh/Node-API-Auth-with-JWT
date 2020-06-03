const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Auth API'
    })
})

//Route to be protect using JWT
app.post('/api/posts', (req, res) => {
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

app.listen(5000, () => console.log('Server running on port 5000'))
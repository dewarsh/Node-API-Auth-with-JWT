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

app.listen(5000, () => console.log('Server running on port 5000'))
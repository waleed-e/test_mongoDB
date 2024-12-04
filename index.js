const express = require('express')
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const { emit } = require("nodemon");

const path = require('path')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const url = process.env.MONGO_URL


app.use(express.json())

app.use(bodyParser.json())
mongoose.connect(url).then(()=>{
    console.log('mongoose server connected successfully')
})
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


const postsRouter = require('./routes/posts.route')
const usersRouter = require('./routes/users.route')

app.use('/api/posts',postsRouter)
app.use('/api/users',usersRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})



const express = require('express')
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express()
const mongoose = require('mongoose')
const port = 3000
const url = process.env.MONGO_URL
app.use(express.json())


mongoose.connect(url).then(()=>{
    console.log('mongoose server connected successfully')
})


const postsRouter = require('./routes/posts.route')

app.use('/api/posts',postsRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})



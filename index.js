const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// connect to db
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to db")
})
// Import Router
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


// Route Middleware
app.use(express.json())
app.use('/api/user', authRouter)
app.use('/api/post', postRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log("up and running")
})
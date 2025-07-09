const express = require('express')
const app = express()
const cors = require('cors')
if(process.env.NODE_ENV !== 'production'){
require('dotenv').config()
}
const workoutRoutes = require('./routes/workout.routes')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080


//global middleware
app.use(express.json())
app.use(cors({
    origin:'*'
}))
//routes
app.use('/api/workouts', workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        //listen on port
        app.listen(PORT, () => {
            console.log('connected to db & listening on port ' + PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

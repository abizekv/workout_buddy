const express = require('express')
const router = express.Router()
const {
    showAllWorkouts,
    showSingleWorkout,
    createNewWorkout,
    editWorkout,
    deleteWorkout
} = require('../controllers/workout.controllers')

//GET all workouts
router.get('/', showAllWorkouts)
//GET one workout
router.get('/:id', showSingleWorkout)
//POST new workout
router.post('/', createNewWorkout)
//PATCH a workout
router.patch('/:id', editWorkout)
//DELETE a workout
router.delete('/:id', deleteWorkout)


module.exports = router
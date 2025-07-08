const Workout = require('../models/workout.model')
const mongoose = require('mongoose')
//get all workouts
const showAllWorkouts = async (req, res) => {
    try {
        const allWorkouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(allWorkouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//show one workout
const showSingleWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'no such workout exists' })
    }
    const singleWorkout = await Workout.findById(id)
    if (!singleWorkout) {
        return res.status(404).json({ msg: 'no such workout exists' })
    }
    res.status(200).json(singleWorkout)
}
//Post new workout
const createNewWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    const emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    try {
        const newWorkout = await Workout.create({ title, reps, load })
        res.status(200).json(newWorkout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//edit a workout
const editWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'workout not found' })
    }
    try {
        const editedWorkout = await Workout.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true })
        if (!editedWorkout) {
            return res.status(404).json({ msg: 'workout not found' })
        }
        res.status(200).json(editedWorkout)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'workout not found' })
    }
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id)
        if (!deletedWorkout) return res.status(404).json({ msg: 'workout not found' })
        res.status(200).json({ msg: 'workout deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    showAllWorkouts,
    showSingleWorkout,
    createNewWorkout,
    editWorkout,
    deleteWorkout
}
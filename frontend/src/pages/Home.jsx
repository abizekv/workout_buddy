import { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const baseUrl = import.meta.env.MOD === 'production' ? 'https://workout-buddy-server-cuc7.onrender.com' : 'http://localhost:8080'

console.log(import.meta.env.MOD)
export default function Home() {
    const [workouts, setWorkouts] = useState(null)
    const getWorkouts = async () => {
        const response = await fetch(baseUrl + '/api/workouts/')
        const workouts = await response.json()
        if (response.ok) {
            setWorkouts(workouts)
        }
    }

    useEffect(() => {
        getWorkouts()
    }, [])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={{ ...workout }} getWorkouts={getWorkouts} />
                ))}
            </div>
            <WorkoutForm getWorkouts={getWorkouts} />
        </div>
    )
}
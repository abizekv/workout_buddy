import { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
export default function Home() {
    const [workouts, setWorkouts] = useState(null)
    const getWorkouts = async () => {
            const response = await fetch('http://localhost:8080/api/workouts/')
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
                <WorkoutDetails key={workout._id} workout={{...workout}} getWorkouts={getWorkouts}/>
            ))}
            </div>
            <WorkoutForm getWorkouts={getWorkouts}/>
        </div>
    )
}
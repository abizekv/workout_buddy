import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const baseUrl = import.meta.env.MODE === 'production' ? 'https://workout-buddy-server-cuc7.onrender.com' : 'http://localhost:8080'

function WorkoutDetails(props) {
  const deleteWorkout = async () => {
      const response = await fetch(baseUrl + '/api/workouts/' + props.workout._id, {
        method: 'DELETE'
      })
      if (!response.ok) {
        console.log('response was not okay')
        const json = await response.json()
        console.log(json.error)
      }
      if (response.ok) {
        props.getWorkouts()
      }
  }
  return (
    <div className="workout-details">
      <h4>{props.workout.title}</h4>
      <p><strong>Load (kg): </strong>{props.workout.load}</p>
      <p><strong>Number of reps: </strong>{props.workout.reps}</p>
      <p>{dayjs(props.workout.createdAt).fromNow()}</p>
    
      <span className="material-symbols-outlined"onClick={deleteWorkout}>delete</span>
    </div>
  )
}

export default WorkoutDetails
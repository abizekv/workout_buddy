import { useState } from "react"
export default function WorkoutForm(props) {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    async function handleSubmit(evt) {
        evt.preventDefault()
        const request = await fetch('http://localhost:8080/api/workouts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, reps, load })
        })
        const json = await request.json()
        if (!request.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (request.ok) {
            setError(null)
            setEmptyFields([])
            setTitle('')
            setReps('')
            setLoad('')
            props.getWorkouts()
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <label>Workout Title</label>
            <input
                className={emptyFields.includes('title') ? 'error' : ''}
                type="text"
                name="title"
                value={title}
                onChange={(evt) => setTitle(evt.target.value)}
            />
            <label>Reps</label>
            <input
                className={emptyFields.includes('reps') ? 'error' : ''}
                type="number"
                name="reps"
                value={reps}
                onChange={(evt) => setReps(evt.target.value)}
            />
            <label>Load (in Kg)</label>
            <input
                className={emptyFields.includes('load') ? 'error' : ''}
                type="number"
                name="load"
                value={load}
                onChange={(evt) => setLoad(evt.target.value)}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
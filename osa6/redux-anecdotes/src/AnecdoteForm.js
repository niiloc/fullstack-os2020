import { useDispatch } from "react-redux"
import { addAnec } from "./reducers/anecdoteReducer"
import { notificationType } from "./reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.blog.value
        event.target.blog.value = ''
        dispatch(addAnec(content))
        dispatch(notificationType(`new anecdote '${content}' created`, 5))      
    }

    return(
        <form onSubmit={addAnecdote}>
        <div><input name="blog" /></div>
        <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
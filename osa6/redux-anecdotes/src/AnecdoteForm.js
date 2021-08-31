import { useDispatch } from "react-redux"
import { addBlog } from "./reducers/anecdoteReducer"
import { notificationType } from "./reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.blog.value
        event.target.blog.value = ''
        dispatch(addBlog(content))
        dispatch(notificationType('new anecdote created'))
        setTimeout(() => {
            dispatch(notificationType(null))
            }, 5000)       
    }

    return(
        <form onSubmit={addAnecdote}>
        <div><input name="blog" /></div>
        <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
import { connect } from "react-redux"
import { addAnec } from "./reducers/anecdoteReducer"
import { notificationType } from "./reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.blog.value
        event.target.blog.value = ''
        props.addAnec(content)
        props.notificationType(`new anecdote '${content}' created`, 5)  
    }

    return(
        <form onSubmit={addAnecdote}>
        <div><input name="blog" /></div>
        <button type="submit">create</button>
        </form>
    )
}


const mapStateToProps = (state) => {
    return {
      anecdote: state.anecdote,
      notification: state.notification
    }
  }
  
  const mapDispatchToProps = {
    addAnec,
    notificationType
  }
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(AnecdoteForm)
  
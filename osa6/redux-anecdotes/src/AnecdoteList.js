import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './AnecdoteForm'
import Notification from './components/Notification'
import Filter from './Filter'
import { addVote } from './reducers/anecdoteReducer'
import { notificationType } from './reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log(state)
        if (state.filter[0].content === null) {
            return state.anecdotes
        }
        else {
            return state.anecdotes.filter(function (el) {
                return el.content.toLowerCase().includes(state.filter[0].content.toLowerCase())
            })
        }
    })
    const dispatch = useDispatch()

    const vote = (id) => {
    dispatch(addVote(id))
    dispatch(notificationType(`new vote added`, 5)) 
    }

    return (
    <div>
        <Notification />
        <Filter />
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}
        <h2>create new</h2>
        <AnecdoteForm />
    </div>
    )
}
export default AnecdoteList
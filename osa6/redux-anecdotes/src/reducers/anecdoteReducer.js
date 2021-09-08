import anecdotes from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVote = content => {
  return async dispatch => {
    const votedAnec = await anecdotes.voteForAnec(content)
    dispatch({
    type: 'ADD_VOTE',
    data: { votedAnec }
    })
  }
}

export const addAnec = content => {
  return async dispatch => {
    const newAnec = await anecdotes.createNew(content)
    dispatch({
    type: 'ADD_ANEC',
    data: newAnec,
    })
  }
}

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecdotes.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecs,
    })
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      console.log(action, "action in reducer")
      const id = action.data.votedAnec.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        votes: blogToChange.votes+1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
        )
    case 'ADD_ANEC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data
    default:
      return state
  }
}

export default reducer
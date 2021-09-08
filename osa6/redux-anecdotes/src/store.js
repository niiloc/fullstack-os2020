import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer, { initializeAnecs } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import anecdotes from './services/anecdotes'
import thunk from 'redux-thunk'

const configureStore = () => {
    const reducer = combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    })

    const store = createStore(reducer, composeWithDevTools(
        applyMiddleware(thunk)
    ))
    return store
} 

export default configureStore
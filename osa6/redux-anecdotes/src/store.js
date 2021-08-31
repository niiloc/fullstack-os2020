import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const configureStore = () => {
    const reducer = combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    })

    const store = createStore(reducer, composeWithDevTools())
    return store
} 

export default configureStore
/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './AnecdoteList'
import { initializeAnecs } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecs())
  },[dispatch])

  return (
    <div>
      <AnecdoteList />
    </div>
  )
}

export default App
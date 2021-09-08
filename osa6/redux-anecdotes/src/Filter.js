import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import filterReducer, { filterChange } from './reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    const search = event.target.value
    console.log(search)
    dispatch(filterChange(search))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
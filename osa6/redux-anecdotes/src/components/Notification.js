
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification )
  if (notification[0].content === null){
    return (
      <div style={{display: 'none'}}></div>
    )
  }
  else {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  return (
    
    <div style={style}>
      {notification[0].content}
    </div>
  )
  }
}



export default Notification
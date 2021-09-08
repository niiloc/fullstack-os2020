
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotes = connect(mapStateToProps)(Notification)

export default ConnectedNotes
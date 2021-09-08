const notificationsAtStart = [
    null
]

const asObject = (notification) => {
    return {
      content: notification
    }
  }

const initialState = notificationsAtStart.map(asObject)

export const notificationType = (content, seconds) => {
    return async dispatch => {
      dispatch({
      type: 'OK',
      message: content,
      })
      setTimeout(() => {
        dispatch({
            type: 'CLEAR'
        })
      }, (seconds*1000))
    }
  }

const notificationReducer = (notification = initialState, action) => {
    switch (action.type) {
        case 'OK':
            const msg = [
                action.message
            ]
            const msgState = msg.map(asObject)
            return msgState
        case 'CLEAR':
            const clearMsg = [
                null
            ]
            return clearMsg.map(asObject)
        default:
            return notification
    }
}

export default notificationReducer
const notificationsAtStart = [
    null
]

const asObject = (notification) => {
    return {
      content: notification
    }
  }

const initialState = notificationsAtStart.map(asObject)

function showNotification(id, text) {
    return { 
        type: 'OK',
        id: id,
        message: text
    }
}

function hideNotification(id) {
    return {
        type: 'CLEAR',
        id
    }
}

let notificationId = 0
let varTimeout

export const notificationType = (content, seconds) => {
    return async dispatch => {
      const id = notificationId++
      dispatch(showNotification(id, content))
      
        clearTimeout(varTimeout)
        varTimeout = setTimeout(() => {
        dispatch(hideNotification(id))
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
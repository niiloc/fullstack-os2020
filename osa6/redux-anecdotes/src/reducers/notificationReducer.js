const notificationsAtStart = [
    null
]

const asObject = (notification) => {
    return {
      content: notification
    }
  }

const initialState = notificationsAtStart.map(asObject)

export const notificationType = (message) => {
    return {
        type: 'OK',
        message: message
    }
}
const notificationReducer = (notification = initialState, action) => {
    console.log('vote not', notification, 'vote actioni', action)
    switch (action.type) {
        case 'OK':
            const msg = [
                action.message
            ]
            const msgState = msg.map(asObject)
            return msgState
        default:
            return notification
    }
}

export default notificationReducer
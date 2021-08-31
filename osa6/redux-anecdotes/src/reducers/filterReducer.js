const filterAtStart = [
    null
]

const asObject = (filter) => {
    return {
      content: filter
    }
  }

const initialState = filterAtStart.map(asObject)

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        const srch = [
            action.filter
        ]
        const srchState = srch.map(asObject)
        return srchState
      default:
        return state
    }
  }

export const filterChange = filter => {
return {
    type: 'SET_FILTER',
    filter,
}
}

export default filterReducer
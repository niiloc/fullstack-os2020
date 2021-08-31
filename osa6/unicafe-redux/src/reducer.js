const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let changedState = initialState
  switch (action.type) {
    case 'GOOD':
      changedState = {
        ...state,
        good: state.good+1
      }
      return changedState
    case 'OK':
      console.log(state, " state")
      changedState = {
        ...state,
        ok: state.ok+1
      }
      console.log(changedState, " changed state")
      return changedState
    case 'BAD':
      changedState = {
        ...state,
        bad: state.bad+1
      }
      return changedState
    case 'ZERO':
      console.log(state)
      changedState = {
        ...state,
        good: 0,
        bad: 0,
        ok: 0
      }
      return changedState
    default: return state
  }
  
}

export default counterReducer
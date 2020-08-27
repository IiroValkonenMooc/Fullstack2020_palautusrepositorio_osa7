const initialState = false

const loginVisibilityReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case 'TOGGLE_LOGIN_VISIBILITY':
      return !state
    default:
      return state
  }
}

export const setLoginVisibility = () => {
  return{
    type: 'TOGGLE_LOGIN_VISIBILITY'
  }
}

export default loginVisibilityReducer
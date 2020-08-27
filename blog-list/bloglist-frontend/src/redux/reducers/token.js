const initialState = {
  payload: '',
  loggedInName: '',
  loggedInUserName: ''
}

const tokenReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN_ALL_FIELDS':
      return action.data
    case 'SET_TOKEN_PAYLOAD':
      return {...state, token: action.data }
    case 'SET_TOKEN_NAME':
      return { ...state, loggedInName: action.data }
    case 'SET_TOKEN_USERNAME':
      return { ...state, loggedInUserName: action.data }
    default:
      return state
  }
}

export const setTokenData = (tokenData) => {
  return (
    {
      type: 'SET_TOKEN_ALL_FIELDS',
      data: tokenData
    }
  )
}

export const setTokenDataPayload = (tokenPayload) => {
  return (
    {
      type: 'SET_TOKEN_PAYLOAD',
      data: tokenPayload
    }
  )
}

export const setTokenDataName = (name) => {
  return (
    {
      type: 'SET_TOKEN_NAME',
      data: name
    }
  )
}

export const setTokenDataUsername = (username) => {
  return (
    {
      type: 'SET_TOKEN_USERNAME',
      data: username
    }
  )
}

export default tokenReducer
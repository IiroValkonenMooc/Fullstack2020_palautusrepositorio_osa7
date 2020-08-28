const initialState = {
  show: false,
  message: '',
  red: false
}

const notificationReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'SET_NOTIFICATION_TEXT':
      return { ...state, message: action.data }
    case 'SET_NOTIFICATION_VISIBILITY':
      return { ...state, show: action.data }
    case 'SET_NOTIFICATION_COLOR_RED':
      return { ...state, red: action.data }
    default:
      return state
  }
}

export const setNotification = (data) => {
  return{
    type: 'SET_NOTIFICATION',
    data: data
  }
}

export const setNotificationText = (data) => {
  return{
    type: 'SET_NOTIFICATION_TEXT',
    data: data
  }
}

export const setNotificationVisibility = (data) => {
  return{
    type: 'SET_NOTIFICATION_VISIBILITY',
    data: data
  }
}

export const setNotificationColorToRed = (data) => {
  return{
    type: 'SET_NOTIFICATION_COLOR_RED',
    data: data
  }
}

export default notificationReducer
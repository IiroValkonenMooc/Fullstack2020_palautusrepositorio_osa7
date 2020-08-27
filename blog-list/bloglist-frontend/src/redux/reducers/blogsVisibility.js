const initialState = false

const blogsVisibilityReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case 'TOGGLE_BLOGS_VISIBILITY':
      return !state
    default:
      return state
  }
}

export const setBlogsVisibilityReducer = () => {
  return{
    type: 'TOGGLE_LOGIN_VISIBILITY'
  }
}

export default blogsVisibilityReducer
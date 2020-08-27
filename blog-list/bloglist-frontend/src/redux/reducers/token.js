const initialState = {
  token: '',
  loggedInName: '',
  loggedInUserName: ''
}

const tokenReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN_PAYLOAD':
      return action.data
    default:
      return state
  }
}

export const setInitialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('blogs :>> ', blogs)

    dispatch(
      {
        type: 'SET_INITIAL_BLOGS',
        data: blogs
      }
    )
  }
}

export default blogsReducer
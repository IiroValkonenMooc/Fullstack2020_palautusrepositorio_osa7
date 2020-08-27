import blogService from '../../services/blogs'

const initialState = []

const blogsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
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
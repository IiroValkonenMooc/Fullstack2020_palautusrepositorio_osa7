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

export const addBlog = (token, newBlog) => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.submitBlog(token, newBlog.title, newBlog.author, newBlog.url)
      console.log('addedBlog :>> ', addedBlog);

      dispatch(
        {
          type: 'ADD_BLOG',
          data: addedBlog.response.data
        }
      )

    } catch (e) {
      dispatch(
        {
          type: 'SET_NOTIFICATION',
          data: {
            show: true,
            message: 'Blog add failed',
            red: true
          }
        }
      )
      setTimeout(() => {
        dispatch(
          {
            type: 'SET_NOTIFICATION',
            data: {
              show: false,
              message: '',
              red: false
            }
          }
        )
      }, 5000)
    }

  }
}

export default blogsReducer
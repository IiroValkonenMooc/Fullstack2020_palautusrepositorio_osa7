import blogService from '../../services/blogs'

const initialState = []

const blogsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      console.log('action.data :>> ', action.data)
      return state.slice().map(
        blog => blog = blog.id === action.data.id
          ? { ...blog, likes: action.data.likes }
          : blog
      )
    case 'DELETE_BLOG':
      return state.slice().filter(blog => blog.id !== action.data)
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
      console.log('addedBlog :>> ', addedBlog)

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

export const likeBlog = (token, blogToLike) => {
  return async dispatch => {
    try {
      console.log('blogToLike :>> ', blogToLike)
      const likedBlog = await blogService.likeBlog(token, blogToLike)
      console.log('addedBlog :>> ', likedBlog)

      dispatch(
        {
          type: 'LIKE_BLOG',
          data: { ...likedBlog.response.data, id: blogToLike.id }
        }
      )

    } catch (e) {
      dispatch(
        {
          type: 'SET_NOTIFICATION',
          data: {
            show: true,
            message: 'Blog like failed',
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

export const deleteBlog = (token, blogToDelete) => {
  return async dispatch => {
    try {
      console.log('blogToDelete :>> ', blogToDelete)
      const deleteResponse = await blogService.deleteBlog(token, blogToDelete)
      console.log('blogToDelete :>> ', deleteResponse)

      dispatch(
        {
          type: 'DELETE_BLOG',
          data: blogToDelete.id
        }
      )

    } catch (e) {
      dispatch(
        {
          type: 'SET_NOTIFICATION',
          data: {
            show: true,
            message: 'Blog delete failed',
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
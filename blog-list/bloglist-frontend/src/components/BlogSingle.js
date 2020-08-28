import React from 'react'
import { setInitialBlogs, likeBlog } from '../redux/reducers/blogs'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUsers } from '../redux/reducers/users'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const BlogSingle = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === props.id))
  if(!blog)
  {
    (async () => {
      dispatch( setInitialBlogs() )
    }) ()
    return null
  }

  return(
    <div>
      <h1>{blog.title}</h1>
      <Link to={blog.url} >{blog.url}</Link>
      <div>
        {`likes: ${blog.likes}`}
        <button
          onClick={ () => {
            dispatch(likeBlog(token.payload, blog))
          }}
        >
          Like
        </button>
      </div>
    </div>
  )
}

export default BlogSingle
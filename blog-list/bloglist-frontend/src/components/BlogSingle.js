import React, { useState } from 'react'
import { setInitialBlogs, likeBlog  } from '../redux/reducers/blogs'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUsers } from '../redux/reducers/users'
import blogsService from '../services/blogs'
import { useField } from '../hooks/useField'
import BlogComments from './BlogComments'
import {
  Link
} from 'react-router-dom'

const BlogSingle = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === props.id))

  const commentText = useField('text')

  if(!blog)
  {
    (async () => {
      dispatch( setInitialBlogs() )
    }) ()
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!commentText.value) { return }
    console.log('comment.value :>> ', commentText.value)
    await blogsService.commentBlog(blog, commentText.value)
    commentText.emptyField()
    dispatch( setInitialBlogs() )
  }

  return(
    <div>
      <h1>{blog.title}</h1>
      {/* <Link to={blog.url} >{blog.url}</Link> */}
      <a href={blog.url} target="_blank" rel='noopener noreferrer'>{blog.url}</a>
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
      <BlogComments blog={blog} />
      <form onSubmit={handleSubmit} >
        <div>{'leave a comment'}</div>
        <input type={commentText.type} value={commentText.value} onChange={commentText.onChange} />
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default BlogSingle
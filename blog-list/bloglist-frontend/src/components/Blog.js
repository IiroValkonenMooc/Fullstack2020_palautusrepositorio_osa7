import React, { useState } from 'react'
import {
  Link
} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '&  > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}))

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  const classes = useStyles()

  const changeShow = () => {
    setViewAll(!viewAll)
  }

  const handleLikeClick = () => {
    likeBlog(blog)
  }

  const handleDeleteClick = () => {
    deleteBlog(blog)
  }

  //console.log('blog :>> ', blog)

  if(!viewAll){
    return (
      <Paper elevation={3} className='Blog-styling'>
        <Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>{`, ${blog.author}`}
        <Button variant='text' color='primary'  onClick={changeShow}>
          view all
        </Button>
      </Paper >
    )
  } else {
    return(
      <div className='Blog-expanded-styling'>
        <div>
          <div>
            <Link to={`/blogs/${blog.id}`}>{`Title: ${blog.title}`}</Link>{`, Author: ${blog.author}`}
          </div>
          <div>
            {`Url: ${blog.url}`}
          </div>
          <div>
            {`Likes: ${blog.likes}`}
            <button  className='Blog-like-button' onClick={handleLikeClick}>
              like
            </button>
          </div>
          <div>
            {`Added by: ${blog.user.username}`}
          </div>
        </div>
        <button className='Blog-info-button' onClick={changeShow}>
          hide <br></br> expanded <br></br> info
        </button>
        <button className='Blog-delete-button' onClick={handleDeleteClick}>
          delete
        </button>
      </div>
    )
  }
}

export default Blog

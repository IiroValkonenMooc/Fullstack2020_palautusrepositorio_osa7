import React from 'react'

const BlogComments = ({ blog }) => {
  if(blog.comments){
    return(
      <div>
        {blog.comments.map(comment => <div key={blog.id}>{comment}</div>)}
      </div>
    )
  }else{
    return(
      null
    )
  }
}

export default BlogComments
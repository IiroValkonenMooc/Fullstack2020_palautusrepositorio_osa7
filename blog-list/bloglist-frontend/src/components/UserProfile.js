import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUsers } from '../redux/reducers/users'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const UsersList = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.find(user => user.id === props.id))
  if(!user)
  {
    (async () => {
      const users = await userService.getAllUsers()
      dispatch( setUsers(users) )
    }) ()
    return null
  }

  return(
    <div>
      <h2>{user.username}</h2>
      <ul>
        {user.addedBlogs.map(blog => {
          return (
            <li key={blog.id}>
              {blog.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UsersList
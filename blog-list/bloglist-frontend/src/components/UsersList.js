import React, { useEffect } from 'react'
import usersService from '../services/users'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUsers } from '../redux/reducers/users'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    (async () => {
      console.log('effect');
      const foundUsers = await usersService.getAllUsers()
      dispatch( setUsers(foundUsers) )
    }) ()
  }, [])

  return(
    <div>
      {
        users.map(user => {
          return(
            <div key={user.id}> {user.username} {`number of blogs: ${user.addedBlogs.length}`} </div>
          )
        })
      }
    </div>
  )
}

export default UsersList
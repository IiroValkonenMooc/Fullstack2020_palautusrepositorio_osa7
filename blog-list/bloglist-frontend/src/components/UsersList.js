import React, { useEffect } from 'react'
import usersService from '../services/users'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUsers } from '../redux/reducers/users'
import {
  Link
} from 'react-router-dom'

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
      <table>
        <tbody>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Blog added</th>
          </tr>
          {
            users.map(user => {
              return (
                <tr key={user.id} >
                  <td> <Link to={`/users/${user.id}`}>{user.username}</Link> </td>
                  <td> {`number of blogs: ${user.addedBlogs.length}`} </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
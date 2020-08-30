import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

const LinkBarLoginMessage = ({ token }) => {
  if(token.payload){
    return(
      <span>{`Logged in as ${token.loggedInUserName}`}</span>
    )
  } else {
    return (
      null
    )
  }

}

const LinkBar = (props) => {
  const token = useSelector(state => state.token)

  return(
    <div>
      <Link to='/'>Home</Link>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <LinkBarLoginMessage token={token} />
      {token.payload ? <button onClick={ props.logout } >logout</button> : null }
    </div>
  )
}

export default LinkBar
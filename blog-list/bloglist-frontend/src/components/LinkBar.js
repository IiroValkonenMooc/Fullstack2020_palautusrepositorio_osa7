import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

const LinkBar = () => {
  return(
    <div>
      <Link to='/'>Home</Link>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
    </div>
  )
}

export default LinkBar
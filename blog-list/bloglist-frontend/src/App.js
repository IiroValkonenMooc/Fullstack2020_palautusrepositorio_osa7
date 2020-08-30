import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedInMessage from './components/loggedInMessage'
import CreateBlogForm from './components/CreateBlogForm'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import LinkBar from './components/LinkBar'
import UsersList from './components/UsersList'
import UserProfile from './components/UserProfile'
import BlogSingle from './components/BlogSingle'
import './App.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  setNotificationText,
  setNotificationVisibility,
  setNotificationColorToRed
} from './redux/reducers/notificationReducer'
import { setInitialBlogs,
  addBlog,
  likeBlog,
  deleteBlog
} from './redux/reducers/blogs'
import {
  setTokenData,
  setTokenDataName,
  setTokenDataPayload,
  setTokenDataUsername
} from './redux/reducers/token'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

const App = () => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  useEffect(() => {
    const lsName = localStorage.getItem('name')
    const lsUsername = localStorage.getItem('username')
    const lsToken = localStorage.getItem('token')

    if( lsName && lsUsername && lsToken){
      dispatch( setTokenDataName(lsName) )
      dispatch( setTokenDataUsername(lsUsername) )
      dispatch( setTokenDataPayload(lsToken) )
    }
  }, [])


  useEffect(() => {
    dispatch( setInitialBlogs() )
  }, [])

  const handleUserLogin = async (login) => {
    console.log('login :>> ', login)
    const tokenData = await loginService.login(login.username, login.password)

    if(tokenData.err ===  null){
      handleMessageChange('Login successful')
      localStorage.setItem('name', tokenData.login.name)
      localStorage.setItem('username', tokenData.login.username)
      localStorage.setItem('token', 'bearer '+tokenData.login.token)
      dispatch( setTokenData(
        {
          payload: tokenData.login.token,
          loggedInName: tokenData.login.name,
          loggedInUserName: tokenData.login.username
        }
      ) )
    } else {
      handleMessageChange('Status:'+tokenData.err.status+' '+tokenData.err.statusText+', '+
        tokenData.err.data.error, true, 4000)
    }
  }

  const handleLogout = () => {
    dispatch( setTokenDataName('') )
    dispatch( setTokenDataUsername('') )
    dispatch( setTokenDataPayload('') )

    handleMessageChange('logged out')

    localStorage.clear()
  }

  const submitNewBlogToDb = async (newBlog) => {
    console.log('newBlog :>> ', newBlog)
    console.log('token.payload :>> ', token.payload)
    dispatch( addBlog( token.payload, newBlog ) )
  }

  const handleMessageChange = async (text, red, timeoutDur) => {
    let timeout
    if (timeoutDur) {
      timeout = timeoutDur
    } else {
      timeout = 800
    }

    //console.log('message päälle');

    red ? dispatch(setNotificationColorToRed(true)) : dispatch(setNotificationColorToRed(false))
    dispatch(setNotificationText(text))
    //setMessageText(text)
    dispatch(setNotificationVisibility(true))
    //setShowMessage(true)

    setTimeout(() => {
      dispatch(setNotificationVisibility(false))
      //setShowMessage(false)
      //console.log('message pois');
    }, timeout)
  }

  const handleBlogLike = async (blog) => {
    dispatch( likeBlog(token.payload, blog) )
  }

  const handleBlogDelete = async (blog) => {
    dispatch( deleteBlog(token.payload, blog) )
  }

  const usersIdMatch = useRouteMatch('/users/:id')
  console.log('usersIdMatch :>> ', usersIdMatch)

  const blogsIdMatch = useRouteMatch('/blogs/:id')
  console.log('blogsIdMatch :>> ', blogsIdMatch)

  return (
    <div>
      <div className='Padded-element'>
        <h2>blogs</h2>
      </div>
      <LinkBar logout={handleLogout} />
      <Switch>
        <Route path='/blogs/:id'>
          {blogsIdMatch ? <BlogSingle id={blogsIdMatch.params.id} /> : null}
        </Route>
        <Route path='/blogs'>
          <Message />
          <div className='Padded-element'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={handleBlogLike} deleteBlog={handleBlogDelete} />
              )}
          </div>
        </Route>
        <Route path='/users/:id'>
          {usersIdMatch ? <UserProfile id={usersIdMatch.params.id} /> : null}
        </Route>
        <Route path='/users'>
          <Message />
          {/* {
            token.loggedInUserName === ''
              ? <Toggleable buttonLabel={'Login'} >
                < LoginForm
                  handleLogin={handleUserLogin}
                />
              </Toggleable>
              :
              < LoggedInMessage
                loggedInUserName={token.loggedInUserName}
                loggedInName={token.loggedInName}
                handleLogout={handleLogout}
              />
          } */}
          <UsersList />
        </Route>
        <Route path="/">
          <Message />
          {
            token.loggedInUserName === ''
              ? <Toggleable buttonLabel={'Login'} >
                < LoginForm
                  handleLogin={handleUserLogin}
                />
              </Toggleable>
              :
              < LoggedInMessage
                loggedInUserName={token.loggedInUserName}
                loggedInName={token.loggedInName}
                handleLogout={handleLogout}
              />
          }

          {token.loggedInUserName !== null
            ? <Toggleable buttonLabel={'send new blog'} ref={blogFormRef} >
              < CreateBlogForm
                submitNewBlogToDb={submitNewBlogToDb}
              />
            </Toggleable>
            : null
          }
          <div className='Padded-element'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={handleBlogLike} deleteBlog={handleBlogDelete} />
              )}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App
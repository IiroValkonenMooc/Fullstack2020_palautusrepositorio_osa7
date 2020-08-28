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
  const [ablogs, setBlogs] = useState([])
  //const [token, setToken] = useState(null)
  //const [loggedInName, setLoggedInName] = useState(null)
  //const [loggedInUserName, setloggedInUsername] = useState(null)
  // const [showMessage, setShowMessage] = useState(false)
  // const [messageText, setMessageText] = useState(false)
  // const [messageRed, setMessageRed] = useState(false)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs, shallowEqual )
  const token = useSelector(state => state.token)

  useEffect(() => {
    const lsName = localStorage.getItem('name')
    const lsUsername = localStorage.getItem('username')
    const lsToken = localStorage.getItem('token')

    if( lsName && lsUsername && lsToken){
      //setLoggedInName(lsName)
      dispatch( setTokenDataName(lsName) )
      //setloggedInUsername(lsUsername)
      dispatch( setTokenDataUsername(lsUsername) )
      //setToken(lsToken)
      dispatch( setTokenDataPayload(lsToken) )
    }
  }, [])


  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )

    dispatch( setInitialBlogs() )
  }, [])

  const handleUserLogin = async (login) => {
    console.log('login :>> ', login)
    const tokenData = await loginService.login(login.username, login.password)

    if(tokenData.err ===  null){
      handleMessageChange('Login successful')
      //setLoggedInName(tokenData.login.name)
      localStorage.setItem('name', tokenData.login.name)
      //setloggedInUsername(tokenData.login.username)
      localStorage.setItem('username', tokenData.login.username)
      //setToken('bearer '+tokenData.login.token)
      localStorage.setItem('token', 'bearer '+tokenData.login.token)
      dispatch( setTokenData(tokenData.login) )
    } else {
      handleMessageChange('Status:'+tokenData.err.status+' '+tokenData.err.statusText+', '+
        tokenData.err.data.error, true, 4000)
    }
  }

  const handleLogout = () => {
    // setLoggedInName(null)
    // setloggedInUsername(null)
    // setToken(null)
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
    // const response = await blogService.submitBlog(token.payload, newBlog.title, newBlog.author, newBlog.url)

    // console.log('response :>> ', response);

    // if (response.err === null) {
    //   handleMessageChange('New blog added: ' + newBlog.title)
    //   const newBlogs = await blogService.getAll()
    //   setBlogs(newBlogs)

    //   blogFormRef.current.toggleVisibility()
    // } else {
    //   handleMessageChange('Blog to add new blog: ' + response.err.data.error)
    // }
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
    // const response = await blogService.likeBlog(token.payload, blog)
    // console.log('blog :>> ', blog)
    // console.log('blog liked')

    // if (response.err === null) {
    //   handleMessageChange(`Blog: ${blog.title} liked`)
    //   const newBlogs = await blogService.getAll()
    //   setBlogs(newBlogs)

    // } else {
    //   handleMessageChange('Failed to add new blog: ' + response.err.response.data.error, true)
    // }
    dispatch( likeBlog(token.payload, blog) )
  }

  const handleBlogDelete = async (blog) => {
    // console.log('deleting blog')
    // const confirmResult = window.confirm(`Really delete blog: ${blog.title}`)

    // if (confirmResult) {

    //   const response = await blogService.deleteBlog(token.payload, blog)

    //   if (response.err === null) {
    //     handleMessageChange(`Blog: ${blog.title} deleted`, false, 6000)
    //     const newBlogs = await blogService.getAll()
    //     setBlogs(newBlogs)
    //   } else {
    //     handleMessageChange('Failed to delete blog: ' + response.err.response.data.error, true, 6000)
    //     const newBlogs = await blogService.getAll()
    //     setBlogs(newBlogs)
    //   }

    // }
    dispatch( deleteBlog(token.payload, blog) )
  }

  return (
    <div>
      <div className='Padded-element'>
        <h2>blogs</h2>
      </div>
      <Router>
        <LinkBar />

        <Switch>
          <Route path="/blogs">

          </Route>
          <Route path="/users">
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
      </Router>
    </div>
  )
}

export default App
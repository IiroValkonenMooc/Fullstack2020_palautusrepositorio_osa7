import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginVisibilityReducer from './reducers/loginVisibility'
import blogsVisibilityReducer from './reducers/blogsVisibility'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogs'
import tokenReducer from './reducers/token'
import usersReducer from './reducers/users'

const reducers = combineReducers(
  {
    notification: notificationReducer,
    blogs: blogsReducer,
    token: tokenReducer,
    users: usersReducer
  }
)

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginVisibilityReducer from './reducers/loginVisibility'
import blogsVisibilityReducer from './reducers/blogsVisibility'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers(
  {
    loginVisibility: loginVisibilityReducer,
    blogsVisibility: blogsVisibilityReducer,
    notification: notificationReducer
  }
)

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import 'fontsource-roboto'
import { ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import Theme from './materialUi/theme'


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme} >
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
  , document.getElementById('root')
)
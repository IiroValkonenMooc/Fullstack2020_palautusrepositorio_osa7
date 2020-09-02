import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = ({ handleLogin }) => {
  const[username, setUsername]=useState('Test')
  const[password,setPassword]= useState('testpass')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin(
      {
        username: username,
        password: password
      }
    )
  }

  return (
    <div className='Padded-element' >
      <h2>Log into application</h2>
      <form  id='loginForm' onSubmit={handleSubmit}>
        <div>
          <TextField
            id="standard-basic"
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange} />
        </div>
        <div>
          <Button size='medium' variant='outlined' color='primary' type='submit' id='loginbutton'>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
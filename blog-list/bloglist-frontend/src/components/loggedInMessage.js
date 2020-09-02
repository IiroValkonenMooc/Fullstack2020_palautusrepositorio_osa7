import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const LoggedInMessage = ({ loggedInUserName, loggedInName, handleLogout }) => {
  const padLeft = { marginLeft: '10px' }

  return (
    <div className='Padded-element' >
      <Typography variant='h2' style={{ fontSize: '2em' }} >Logged in as {loggedInUserName}</Typography>
      <Typography style={{ display: 'inline-block' }} >Hello {loggedInName}</Typography>
      <Button variant="contained" color="primary" style={padLeft}  onClick={handleLogout} >
              logout
      </Button>
    </div>
  )
}

export default LoggedInMessage
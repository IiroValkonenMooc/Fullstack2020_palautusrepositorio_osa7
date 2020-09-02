import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'
import StyledLink from './styledComponents/StyledLink'
import StyledContainer from './styledComponents/StyledContainer'
import StyledText from './styledComponents/StyledText'


const LinkBarLoginMessage = ({ token }) => {
  if(token.payload){
    return(
      <StyledText>{`Logged in as ${token.loggedInUserName}`}</StyledText>
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
    <StyledContainer>
      <StyledLink to='/'>Home</StyledLink>
      <StyledLink to='/blogs'>Blogs</StyledLink>
      <StyledLink to='/users'>Users</StyledLink>
      <div  style={{ display: 'inline-block', float:'right', padding:'5px' }}>
        <LinkBarLoginMessage token={token} />
        {token.payload ? <button onClick={ props.logout } >logout</button> : null }
      </div>
    </StyledContainer>
  )
}

export default LinkBar
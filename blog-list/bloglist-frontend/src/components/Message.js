import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, shallowEqual } from 'react-redux'

const Message = ({ show, message, red }) => {
  const notification = useSelector(state => state.notification, shallowEqual)

  if(notification.show){
    if(notification.red){
      return(
        <div>
          <p className="Message-red" >{notification.message}</p>
        </div>
      )
    } else {
      return(
        <div>
          <p className="Message-green" >{notification.message}</p>
        </div>
      )
    }
  }
  else{
    return null
  }
}

Message.propTypes = {
  show: PropTypes.bool.isRequired
}

export default Message
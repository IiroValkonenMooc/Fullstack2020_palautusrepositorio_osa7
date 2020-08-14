import React from 'react'

const Notification = ({text}) => {
    if (text !== '' || text !== null || text !== undefined) {
        return(
            <div>
                {text}
            </div>
        )
    } else{
        return null
    }
}

export default Notification
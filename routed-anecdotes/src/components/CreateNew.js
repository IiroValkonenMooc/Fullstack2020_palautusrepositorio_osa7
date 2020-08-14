import React from 'react'
import { useField } from '../hooks/index';

const CreateNew = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const noReset = ({ reset, ...rest }) => rest
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const resetFields = () => {
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...noReset(content)} />
          </div>
          <div>
            author
            <input {...noReset(author)} />
          </div>
          <div>
            url for more info
            <input {...noReset(info)}/>
          </div>
          <button type='submit' >create</button>
          <button type='button'
            style={{marginLeft:'10px'}}
            onClick={ resetFields }
          >
            reset
          </button>
        </form>
      </div>
    )
}

export default CreateNew
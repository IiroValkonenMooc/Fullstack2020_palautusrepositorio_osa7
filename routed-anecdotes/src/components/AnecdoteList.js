import React from 'react'
import {
    Link,
} from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}<Link style={{paddingLeft: '10px'}} to={`/anecdotes/${anecdote.id}`} >view</Link></li>)}
      </ul>
    </div>
  )

export default AnecdoteList
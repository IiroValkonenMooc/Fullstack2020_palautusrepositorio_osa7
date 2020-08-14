import React from 'react'

const SingleAnecdoteUseRouteMatch = ({ anecdote }) => (
    <div>
      <h2>Anecdotes</h2>
      <h3>{`${anecdote.content} by ${anecdote.author}`}</h3>
      {`has ${anecdote.votes} votes`}
    </div>
)

export default SingleAnecdoteUseRouteMatch
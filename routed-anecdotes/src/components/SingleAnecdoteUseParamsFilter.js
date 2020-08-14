import React from 'react'
import {
    useParams
   } from 'react-router-dom';

const SingleAnecdoteUseParamsFilter = ({ anecdotes }) => {
    const id = useParams().id
    const foundAnecdote = anecdotes.find(anecdote => anecdote.id === id)
  
    return (
      <div>
        <h2>Anecdotes</h2>
        <h3>{`${foundAnecdote.content} by ${foundAnecdote.author}`}</h3>
        {`has ${foundAnecdote.votes} votes`}
      </div>
    )
  }

export default SingleAnecdoteUseParamsFilter
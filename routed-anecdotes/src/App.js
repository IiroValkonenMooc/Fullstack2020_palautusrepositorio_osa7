import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

//import SingleAnecdoteUseParamsFilter from './components/SingleAnecdoteUseParamsFilter'
import SingleAnecdoteUseRouteMatch from './components/SingleAnecdoteUseRouteMatch'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Notification from './components/Notification';


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [timeoutID, settimeoutID] = useState(null)
  

  const addNew = (anecdote) => {
    if(timeoutID){
      clearTimeout(timeoutID)
    }
    
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`added new anecdote ${anecdote.content}`)

    const timer = setTimeout(() => {
      setNotification('')
      settimeoutID(null)
    }, 5000);

    settimeoutID(timer)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null
  console.log('anecdote :>> ', anecdote);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path='/anecdotes/:id'>
          {/* <SingleAnecdoteUseParamsFilter anecdotes={anecdotes} /> */}
          {
            anecdote===null||anecdote==undefined
              ? <div style={{ paddingTop: '20px' }}>
                  <span style={{fontSize: '80px'}} >Anecdote not found</span>
                </div>
              : <SingleAnecdoteUseRouteMatch anecdote={anecdote} />
          }
        </Route>
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/create'>
          <Notification text={notification} />
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <Notification text={notification} />
          <AnecdoteList anecdotes={anecdotes} />
          <About />
          <CreateNew addNew={addNew} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;

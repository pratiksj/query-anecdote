import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnectodes } from './request'

const App = () => {

  const result = useQuery("anecdotes",getAnectodes)
  
  

  if(result.isLoading){
    return <h1>loading data</h1>
  }

  const anecdotes = result.data
  console.log(anecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

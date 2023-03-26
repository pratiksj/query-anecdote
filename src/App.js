import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { getAnectodes,updateAnecdote} from './request'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      console.log(anecdotes, "this is last ")

      queryClient.setQueryData('anecdotes',anecdotes.map((anecdote)=>{
        return anecdote.id===updatedAnecdote.id? updatedAnecdote: anecdote
      }))
    },
  })


  const result = useQuery("anecdotes",getAnectodes,{
    retry:false
  })
  
  if(result.isLoading){
    return <h1>loading data</h1>
   
  } 

  if(result.isError){
    return <h1>Anecdote service not available due to problems in server</h1>
   
  } 

  const anecdotes = result.data
  console.log(anecdotes)
  
  
  const handleVote = (anecdote) => {
    console.log(anecdote,"handlevote")
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
    
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm/>
    
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

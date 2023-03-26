import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { getAnectodes,updateAnecdote} from './request'
//import { useContext } from 'react'
//import AnecdoteContext from './AnecdoteContext'
import { useMessageDispatch } from './AnecdoteContext'

const App = () => {
  //const [notification,dispatch] = useContext(AnecdoteContext)
  const dispatch = useMessageDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      console.log(updatedAnecdote,"this me upatenotification")
      const anecdotes = queryClient.getQueryData('anecdotes')

      queryClient.setQueryData('anecdotes',anecdotes.map((anecdote)=>{
        return anecdote.id===updatedAnecdote.id? updatedAnecdote: anecdote
      }))
      dispatch({type:"SET_NOTIFICATION",message:`${updatedAnecdote.content} has been liked`})
      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      },2000) 
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

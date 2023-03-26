import {createAnecdote } from '../request'
import { useMutation,useQueryClient } from 'react-query'
import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'


const AnecdoteForm = ({type}) => {
  const [notification,dispatch] = useContext(AnecdoteContext)

const queryClient = useQueryClient()

const newAnecdoteMutation = useMutation(createAnecdote,{
  onSuccess: (newAnecdote) => {
    console.log(newAnecdote,"i am new anecdote")
    const notes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', notes.concat(newAnecdote))

        
  },
})


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //newAnecdoteMutation.mutate({content,votes:0})
    try{
      await newAnecdoteMutation.mutateAsync({content,votes:0})
      dispatch({type:"SET_NOTIFICATION",message:`${content} has added`})
      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      },2000)
    } catch(error){
      dispatch({type:"SET_NOTIFICATION",message:error.response.data.error})
      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      },2000)
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm




import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnectodes = () =>
  axios.get(baseUrl).then(res => res.data)


  export const createAnecdote = newAnecdote =>{
  return axios.post(baseUrl, newAnecdote).then(res => {return res.data})}

  export const updateAnecdote = updatedAnecdote =>{
   return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => { return res.data})}
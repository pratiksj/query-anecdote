import axios from 'axios'


export const getAnectodes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)
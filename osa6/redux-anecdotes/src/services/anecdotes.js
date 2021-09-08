import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
    const object = { 
      content: content,
      votes: 0 }
    try {
      const response = await axios.post(baseUrl, object)
      return response.data
    } catch(err) {
      console.log(err)
    }
    
}

export const voteForAnec = async (id, content) => {
  try {
    let firstResponse = await axios.get(`${ baseUrl }/${id}`)
    let updatedVote = firstResponse.data
    console.log(updatedVote, "update vote request")
    updatedVote = {
      ...updatedVote,
      votes: updatedVote.votes+1
    }
    console.log(updatedVote, "update after adding")
    const response = await axios.put(`${ baseUrl }/${id}`, updatedVote)
    return response.data
  } catch(err) {
    console.log(err)
  }
}

export default { 
    getAll,
    createNew,
  voteForAnec }
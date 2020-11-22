import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const copy = [...props.points]
  const [selected, setSelected] = useState(0)
  const [selectedVote, setVote] = useState(copy)
  const random = 0
  
  const setValue = (newValue) => {
    newValue = getRandomInt(0, anecdotes.length)
    setSelected(newValue)

  }

  const voteAnecdote = (newValue) => {
    console.log(selectedVote, "vanha")
    setVote(selectedVote.map((item, j) => {
      if (j === newValue) {
        return item + 1;
      } else {
        return item;
      }
      
    }))
    console.log(selectedVote, "uusi")
  }

  return (
    
    <div>

      {props.anecdotes[selected]} <br />
      has {selectedVote[selected]} votes 
      <br />
            
      
      <Button handleClick={()=> setValue(random)} text="randomize"/>
      <Button handleClick={()=> voteAnecdote(selected)} text="vote" />

      <MostVotes array={selectedVote} anecdotes={anecdotes}/>
    </div>
      )
}

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVotes = props => {
  let i = props.array.indexOf(Math.max(...props.array))
  return (
    <div>
    <h1>Anectode with most votes</h1>
    <p>{props.anecdotes[i]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

ReactDOM.render(
  <App anecdotes={anecdotes} points={points}/>,
  document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} excercise={props.exercises1}/>
      <Part part={props.part2} excercise={props.exercises2}/>
      <Part part={props.part3} excercise={props.exercises3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.excercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3

  return (
    <div>
      <Header name={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2}
      part3={part3} exercises3={exercises3}/>
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

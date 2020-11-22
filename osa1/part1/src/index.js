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
  console.log(props)
  return (
    
    <div>
      
      <Part part={props.part[0].name} excercise={props.part[0].exercises}/>
      <Part part={props.part[1].name} excercise={props.part[1].exercises}/>
      <Part part={props.part[2].name} excercise={props.part[2].exercises}/>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const total = course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises

  return (
    <div>
      <Header name={course.name} />
      <Content part={course.parts}/>
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

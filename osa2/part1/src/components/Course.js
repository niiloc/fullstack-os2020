import React from 'react'

const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        <Content part={props.course.parts} />
        <Total total={props.course.parts}/>
      </div>
    )
  } 
  
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
        {props.part.map(parts =>
          <ul key={parts.id}>
            <Part part={parts.name} excercise={parts.exercises}/>
          </ul>
          )}
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
  
    const totals = props.total.reduce( (s, p) => {
    return s+p.exercises}, 0)
  
  
    return (
      <div>
        <p>
          total of {totals} exercises
        </p>
      </div>
    )
      
    // return (
  
    // )
  }

  export default Course
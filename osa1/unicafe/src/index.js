import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, bad, neutral, sum, average, percentage}) => {
  return (
    <div>
      <h1>statistics</h1>
      <StatisticPrint good={good} bad={bad} neutral={neutral} sum={sum} average={average} percentage={percentage} />
    </div>
  )
}

const StatisticPrint = props => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0){
    return (
      <div>No feedback given</div>
    )
  }
  else{
    return (
      <table>
      <tbody>
        <tr>
          <td>bad </td><td>{props.bad}</td>
        </tr>
        <tr>
          <td>good </td><td>{props.good}</td>
          </tr>
        <tr>
          <td>neutral </td><td>{props.neutral}</td>
          </tr>
        <tr>
          <td>all </td><td>{props.sum}</td>
        </tr>
        <tr>
          <td>average </td><td>{props.average}</td>
          </tr>
        <tr>
          <td>percentage </td><td>{props.percentage}</td>
          </tr>
      </tbody>
      </table>
    )
    }
}

const GoodButton = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const BadButton = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const NeutralButton = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <BadButton handleClick={() => setBad(bad+1)} text="bad" />
      <GoodButton handleClick={() => setGood(good+1)} text="good" />
      <NeutralButton handleClick={() => setNeutral(neutral+1)} text="neutral" />
      {/* <Statistics good={good} bad={bad} neutral={neutral} />
      <Statistics good={good} bad={bad} neutral={neutral} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} text="good"/>
      <Statistics good={good} bad={bad} neutral={neutral} text="neutral"/> */}
      <Statistics good={good} bad={bad} neutral={neutral} sum={bad+good+neutral} average={((bad*-1)+good)/(bad+good+neutral)} percentage={good/(bad+good+neutral)*100} text="sum"/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
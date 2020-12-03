import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
  <p> 
  filter: <input onChange={props.func}></input>
  </p>
  )
}

const Show = (props) => {
  console.log(props.info)
  if (props.show === props.info.name){
    return(
      <div>
      <h1>{props.info.name}</h1>
      <p>capital {props.info.capital}</p>
      <p>population {props.info.population}</p>
      <h2>language</h2>
      <ul>
        {props.info.languages.map(language => 
          <div key={language.iso639_1}>{language.name}</div>)}
      </ul>
      <img src={props.info.flag} width="180" alt="flag"/>
      <Weather country={props.info.capital}/>
    </div>
    )
  }
  else {
  return null
  }
}

const Weather = (props) => {
  const [weather, setWeather] = useState([])
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: props.country
  }
  const getWeather = (weatherResponse) => {
    setWeather(weatherResponse)
  }
  useEffect(() => {
    let ax_query = `http://api.openweathermap.org/data/2.5/weather?q=${params.query}&appid=${params.access_key}&units=metric`
    axios
      .get(ax_query)
      .then(response => {
        if (!response.data.error) {

        getWeather(response.data)    
        } else {
          console.log(`Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
        }
        
      }).catch(error => {
        console.error("An error occurred: ", error)
      })
      
    }, [])
    if (weather.main !== undefined){
    return (
      <div>
      <h1>Weather in {weather.name}</h1>
      <p>temperature {weather.main.temp}C <br/>
      {weather.weather[0].main}: {weather.weather[0].description}
      </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      </div>
    
    )
    }
    return null
}

const Countries = (props) => {
  const [ showInfo, setShowInfo ] = useState('')

  if (props.show || props.notes.length > 10)
    return "too many matches"
  else if (props.notes.length === 1) {
    console.log(props.notes.capital)
    return(
    <div>
      <h1>{props.notes[0].name}</h1>
      <p>capital {props.notes[0].capital}</p>
      <p>population {props.notes[0].population}</p>
      <h2>language</h2>
      <ul>
        {props.notes[0].languages.map(language => 
          <div key={language.iso639_1}>{language.name}</div>)}
      </ul>
      <img src={props.notes[0].flag} width="180" alt="flag"/>

      <Weather country={props.notes[0].capital}/>
    </div>

    
    )
  }
  else {
  return(
    <ul>{props.notes.map(person => 
    <div key={person.name}> {person.name}  <button onClick={() => setShowInfo(showInfo.length ? '' : person.name)}>Toggle view</button> <Show info={person} show={showInfo}/></div>
    )}
    </ul>
  )
    }
}

function App() {

  const [countries, setCountry] = useState([])
  const [ showAll, setShowAll ] = useState('true')
  const [ filteredValue, setFilter ] = useState('')

useEffect(() => {

axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setCountry(response.data)
  })

}, [])

const filterNotes = showAll ? countries : countries.filter(country => country.name.toLowerCase().includes(filteredValue))
const handleFilter = (event) => {
  setShowAll(false)
  setFilter(event.target.value)

}
  return (
    <div>
      <Filter func={handleFilter} />

      <Countries notes={filterNotes} show={showAll}/>
    </div>
  );
}

export default App;

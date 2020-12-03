import React, { useEffect, useState } from 'react'
import personService from './services/persons.js'

const Filter = (props) => {
  return (
  <p> 
  filter: <input onChange={props.func}></input>
  </p>
  )
}

const PersonForm = (props) => {
  return(
  <form onSubmit={props.addperson}>
        <div>
          name: <input value={props.newname}
          onChange={props.handlenotechange}/>
        </div>
        <div>
          phone: <input value={props.newphone}
          onChange={props.handlephonechange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return(
    <ul>{props.notes.map(person => 
      <div key={person.name} >{person.name} {person.phone} <DeleteButton name={person.name} person={person} click={props.ondeleteclick}/></div>
    )}
    </ul>
  )
}

const DeleteButton = (props) => {
  const handleClick = (e) => {
    console.log(e.target.value)
    props.click(props.person)
  }
  return(
    <button onClick={handleClick}>delete</button>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === 'error'){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const [ persons, setPersons] = useState([
    { name: '', phone: '' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ showAll, setShowAll ] = useState('true')
  const [ filteredValue, setFilter ] = useState('')
  const [ sucessMessage, setSucessMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      phone: newPhone,
      id: undefined
    }


  if (persons.some(person => person.name === nameObject.name)){
    var array = [...persons]
    var index = array.map(function(e) { return e.name; }).indexOf(nameObject.name);
    if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)){
      nameObject.id = array[index].id
      personService
        .updateNumber(nameObject)
        .then(returnedPerson => {

          if (index !== -1){
            array.splice(index, 1)
            setPersons(array.concat(returnedPerson))
            
            setSucessMessage(`${nameObject.name}'s phone changed to ${nameObject.phone}`)
            setTimeout(() => {
              setSucessMessage(null)
            }, 5000)
          }
          
        })
        .catch(error => {
          setErrorMessage(`the note has already been deleted from the server`)
        })
        .setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }

  }
  else{
    
    personService    
      .create(nameObject)    
      .then(returnedPerson => {    
        setPersons(persons.concat(returnedPerson))  
        console.log(returnedPerson) 
        setSucessMessage(`${nameObject.name} added to phonebook`)
        setTimeout(() => {
          setSucessMessage(null)
        }, 5000)
    })
  }
  setNewName('')
  setNewPhone('')
  }

  const removePerson = (props) => {
    if (window.confirm(`Delete ${props.name}?`)){
      var array = [...persons]
      var index = array.map(function(e) { return e.name; }).indexOf(props.name);

      personService
        .deletePerson(props.id)
        .then(response => {

        })
      
      if (index !== -1){
        array.splice(index, 1)
        setPersons(array)
      }
      setSucessMessage(`${props.name} deleted from phonebook`)
      setTimeout(() => {
        setSucessMessage(null)
      }, 5000)
    }

  }

  const filterNotes = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredValue))

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setShowAll(false)
    setFilter(event.target.value)
  
  }

  return (
    <div> 
      <h2>Phonebook</h2>

      <Notification message={sucessMessage}/>
      <Notification message={errorMessage} type='error'/>

      <Filter func={handleFilter} />

      <h2>add a new</h2>

      <PersonForm addperson={addPerson} newname={newName} handlenotechange={handleNoteChange}
        newphone={newPhone} handlephonechange={handlePhoneChange} />

      <h2>numbers</h2>

      <Persons notes={filterNotes} ondeleteclick={removePerson}/>
    </div>
  )

}

export default App
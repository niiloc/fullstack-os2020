require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

let people = [
  {    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },

  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },

  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  }

]

morgan.token('post_req', function getResponse (res) {
  return JSON.stringify(res.body)
})


app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[header] :total-time[2] :post_req'))
app.use(cors())


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  let date_time = new Date()
  const time_of_request = date_time.toString()
  const response_text = `<p>Phonebook has info for ${people.length} people</p>
    <br/>
    ${time_of_request}`

  res.send(response_text)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// maybe new post?
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//   // const maxId = notes.length > 0
//   //   ? Math.max(...notes.map(n => n.id))
//   //   : 0
//   // return maxId + 1
//   let randomId = Math.random()
//   min = Math.ceil(1)
//   max = Math.floor(10000)
//   randomId = Math.floor(Math.random() * (max - min) + min)
//   return randomId
// }
/* eslint-disable */
const PORT = process.env.PORT || 3001
/* eslint-enable */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `${error.message}` })
  }

  next(error)
}

app.use(errorHandler)
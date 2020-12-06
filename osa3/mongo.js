const mongoose = require('mongoose')

const password = process.argv[2]

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const url =
  `mongodb+srv://fullstack:${password}@cluster0.06pff.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const name = process.argv[3]
const number = process.argv[4]

console.log(process.argv.length, 'length')

if (process.argv.length<4) {
  console.log('inside print')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}


const person = new Person({
  name: name,
  number: number,
})

person.save().then(response => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
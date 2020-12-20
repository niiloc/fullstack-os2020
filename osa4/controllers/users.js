const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length <3 || !body.password) {
    return response.status(401).json({error: 'password too short or missing'})
  } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('notes', {title: 1, likes: 1})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
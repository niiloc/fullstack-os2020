const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const lodash = require('lodash')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let auth = {}

beforeEach(async () => {
    await Blog.deleteMany({})

    savedBlogs = await Blog.create(helper.initialBlogs)

    await User.deleteMany({})
    const newUser = {
      username: 'testi123456',
      name: 'Testi testersson',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .post('/api/login')
      .send({
        username: 'testi123456',
        password: 'salainen'
      })
    
    auth.token = response.body.token
 
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('how many notes', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('id defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog added', async() => {
  const newBlog = {
    title: 'new testie',
    author: 'new testiement',
    url: 'www.test.ie',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${auth.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  
  const contents = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'new testie'
  )

})

test('if no like, likes zero', async() => {
  const newBlog = {
    title: 'new testie',
    author: 'new testiement',
    url: 'www.test.ie',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${auth.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.likes)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents[5]).toBe(0) 
})

test('if bad request', async() => {
  const newBlog = {
    author: 'new testiement',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${auth.token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r)

  expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('the one with most blogs', async() => {
  const response = await api.get('/api/blogs')
  const body = response.body

  result = helper.mostBlogsByAuthor(body)

  expect(result.author).toContain('niles')
})

test('the one with most likes', async() => {
  const response = await api.get('/api/blogs')
  const body = response.body
  result = helper.mostLikesByAuthor(body)
  expect(result.author).toContain('mr. nobody')
})

afterAll(() => {
    mongoose.connection.close()
  })
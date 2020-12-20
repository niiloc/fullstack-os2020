const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body 

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    if (blog.url && blog.title) {
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } else {
        response.status(400).end()
    }
    
})

blogRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    if (!request.token) {
        response.status(401).json({error: 'user not logged in'})
    }

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    if (blog.user.toString() === user.id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({error: 'action unauthorized'})
    }
})

blogRouter.put('/:id', async (request, response) => {
    const blog = request.body

    newBlog = {
        likes: blog.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')


const initialBlogs = [
  {
    title: 'meta world living',
    author: 'mr. nobody',
    url: 'www.google.com',
    likes: 3,
  },
  {
    title: 'never say that again',
    author: 'niles',
    url: 'www.google.fi',
    likes: 5
  },
  {
    title: 'she my DAUGHTER',
    author: 'niles',
    url: 'www.google.fi',
    likes: 10
  },
  {
    title: 'chaos magicians, amirite',
    author: 'niles',
    url: 'www.google.fi',
    likes: 3
  },
  {
    title: 'art critic',
    author: 'mr. nobody',
    url: 'www.google.fi',
    likes: 999
  }
]

const nonExistingId = async () => {
  const blog = new Note({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const reduceTheObject = (body) => {
  let result = body.reduce((acc, val) => {
    let o = acc.filter((obj) => {
      return obj.author == val.author
    }).pop() || {author:val.author, likes:0}

    o.likes += val.likes
    acc.push(o)
    return acc
  }, [])
  return result
}

const mostBlogsByAuthor = (body) => {
  countedAmountsV2 = _.countBy(body, 'author')
  console.log(countedAmountsV2)
  sortedAuthors = orderArray(countedAmountsV2)
  mostBlogsHere = {
    author: Object.keys(sortedAuthors)[0],
    blogs: Object.values(sortedAuthors)[0]
  }

  return mostBlogsHere
}

const mostLikesByAuthor = (body) => {
  likesPerAuthor = reduceTheObject(body)
  uniqueAuthors = _.uniqBy(likesPerAuthor, 'author')

 
  reducedAuthors = reduceIntoOneObject(uniqueAuthors)
  sortedAuthors = orderArray(reducedAuthors)
  mostLikesHere = {
    author: Object.keys(sortedAuthors)[0],
    likes: Object.values(sortedAuthors)[0]
  }

  return mostLikesHere
}

const reduceIntoOneObject = (arr) => {
  authorsIntoObject = arr.reduce(
    (obj, item) => Object.assign(obj, { [item.author]: item.likes }), {})
  
  return authorsIntoObject
}

const orderArray = (arr) => {
  const sortedAuthors = Object.fromEntries(
    Object.entries(arr).sort(([,a],[,b]) => b-a)
  )
  return sortedAuthors
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb, 
  usersInDb, 
  reduceTheObject,
  mostLikesByAuthor,
  mostBlogsByAuthor,
}
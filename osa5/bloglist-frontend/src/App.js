import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>

      setBlogs( blogs.sort(function (a, b) {
        return b.likes - a.likes
      }) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in witih', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setErrorMessage('user logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handlePost = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)

      blogService.getAll().then(blogs =>

        setBlogs( blogs.sort(function (a, b) {
          return b.likes - a.likes
        }) )
      )
      setErrorMessage(`blog ${blogObject.title} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('title or author missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


  }

  const addLike = async (id, blogObject) => {

    try {
      await blogService.update(id, blogObject)
      blogService.getAll().then(blogs =>

        setBlogs( blogs.sort(function (a, b) {
          return b.likes - a.likes
        }) )
      )
      setErrorMessage(`added like to ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('couldn\'t add like')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deletePost = async (id, blogObject) => {
    try {
      await blogService.deletePost(id)
      
      blogService.getAll().then(blogs =>

        setBlogs( blogs.sort(function (a, b) {
          return b.likes - a.likes
        }) )
      )

      setErrorMessage(`deleted post ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('couldn\'t delete post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button id='logout' type="submit">logout</button>
    </form>
  )

  const loginForm = () => {
    return(
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={( { target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )

  }


  const blogForm = () => (
  // <form onSubmit={addBlog}>
  //     <input
  //       value={newBlog}
  //       onChange={handleBlogChange}
  //     />
  //     <button type="submit">save</button>
  // </form>
    <p></p>
  )

  const createForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm
            postBlog={handlePost}
          />
        </Togglable>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? loginForm()
        :
        <div>
          <p>{user.name} logged</p>
          {blogForm()}


          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deletePost={deletePost} />
          )}

          {createForm()}

          {logoutForm()}
        </div>

      }
    </div>
  )
}

export default App
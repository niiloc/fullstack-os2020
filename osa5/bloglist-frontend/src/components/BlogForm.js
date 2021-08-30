import React, { useState } from 'react'

const BlogForm = ({ postBlog }) => {


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog= (event) => {
    event.preventDefault()
    let newObject = new Object()
    newObject = {
      title: title,
      author: author,
      url: url,
    }
    postBlog(newObject)
    setAuthor('')
    setUrl('')
    setTitle('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
            title:
        <input
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author:
        <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url:
        <input
          id='url'
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='createblog' type="submit">create</button>
    </form>
  )
}

export default BlogForm
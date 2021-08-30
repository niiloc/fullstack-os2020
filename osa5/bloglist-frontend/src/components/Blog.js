import React, { useState } from 'react'
const Blog = ({ idkey, blog, addLike, deletePost }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const clickLike = () => {
    console.log(idkey, ' i key')
    let newObject = new Object()
    console.log(blog.likes, ' blog likes')
    console.log(typeof blog.likes)

    let likes = ((blog.likes > 0) ? (blog.likes + 1) : 1)
    console.log(likes)
    newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes
    }
    console.log(newObject)
    addLike(blog.id, newObject)
  }

  const removePost = () => {
    if (window.confirm('are you sure you want to delete?')) {
      deletePost(blog.id, blog)
      console.log('deleted')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(

    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible} className="Visible">
          <p>{blog.title} <button id='viewbtn' onClick={toggleVisibility}>view</button></p>
          <p>{blog.author}</p>
        </div>
        <div style={showWhenVisible} className="notVisible">
          <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{blog.likes}  <button id='likebtn' onClick={clickLike}>like</button> </p>
          <p><button id='removepostbtn' onClick={removePost}>remove</button> </p>
        </div>
      </div>

    </div>
  )}

export default Blog
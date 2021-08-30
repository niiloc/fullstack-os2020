import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('add a new blog', async() => {
  const createPost = jest.fn()
  const component = render(
    <BlogForm postBlog={createPost} />
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'im an author' }
  })
  fireEvent.change(title, {
    target: { value: 'this is my title' }
  })
  fireEvent.change(url, {
    target: { value: 'website of mine' }
  })
  fireEvent.submit(form)
  expect(createPost.mock.calls).toHaveLength(1)

  await (() =>
    expect(createPost).toHaveBeenCalledWith({
      author: 'im an author',
      title: 'this is my title',
      url: 'website of mine',
    })
  )

})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    url: '',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  // tapa 2
  const element = component.getAllByText(
    'tester'
  )
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    url: 'www.test.io',
    likes: 0
  }


  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.notVisible')
  expect(div).toHaveStyle('display: none')

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const div_open = component.container.querySelector('.notVisible')
  expect(div_open).toHaveStyle('display: block')

})

test('is likes and url shown', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    url: 'www.test.io',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  const url = component.getByText('www.test.io')
  expect(url).toHaveStyle('display: block')
  const likes = component.getByText('0')
  expect(likes).toHaveStyle('display: block')
})

test('press button twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    url: 'www.test.io',
    likes: 0
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})


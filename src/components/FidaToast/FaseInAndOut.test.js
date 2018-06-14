import React from 'react'
import ReactDOM from 'react-dom'
import FadeInAndOut, { fadeIn, fadeOut } from './FadeInAndOut'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <FadeInAndOut>
      <h1>Test</h1>
    </FadeInAndOut>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})

it('fade in add class', () => {
  const div = document.createElement('div')
  fadeIn(div)
  expect(div.classList.contains('fadeInDownBig')).toBeTruthy()
  expect(div.classList.contains('animated')).toBeTruthy()
})

it('fade out add class', () => {
  const div = document.createElement('div')
  fadeOut(div)
  expect(div.classList.contains('fadeOutUpBig')).toBeTruthy()
  expect(div.classList.contains('animated')).toBeTruthy()
})

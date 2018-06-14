import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
} from './auth'

it('doCreateUserWithEmailAndPassword user returns promise', () => {
  const returnValue = doCreateUserWithEmailAndPassword('test@test.com', 'password')
  expect(returnValue).toBeInstanceOf(Object)
})

it('doSignInWithEmailAndPassword returns object', () => {
  const returnValue = doSignInWithEmailAndPassword('test@test.com', 'password')
  expect(returnValue).toBeInstanceOf(Object)
})

it('doSignOut returns object', () => {
  const returnValue = doSignOut()
  expect(returnValue).toBeInstanceOf(Object)
})

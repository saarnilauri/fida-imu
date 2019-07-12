import {
  doCreateUser,
  onceGetUsers,
  onceGetUserById,
  writeUserData,
} from './db'

it('create user returns promise', () => {
  const returnValue = doCreateUser('123', 'testname', 'test@test.com', [
    'admin',
  ])
  expect(returnValue).toBeInstanceOf(Promise)
})

it('onceGetUsers returns object', () => {
  const returnValue = onceGetUsers()
  expect(returnValue).toBeInstanceOf(Object)
})

it('onceGetUserById returns object', () => {
  const returnValue = onceGetUserById('123')
  expect(returnValue).toBeInstanceOf(Object)
})

it('writeUserData returns promise', () => {
  // id, name, email, description, roles, countries, churches
  const returnValue = writeUserData(
    '123',
    'testname',
    'test@test.com',
    'description',
    ['admin'],
    ['thailand'],
    ['church'],
  )
  expect(returnValue).toBeInstanceOf(Object)
})
